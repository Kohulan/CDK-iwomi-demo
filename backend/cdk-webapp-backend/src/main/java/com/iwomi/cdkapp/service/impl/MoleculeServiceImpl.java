package com.iwomi.cdkapp.service.impl;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.openscience.cdk.exception.CDKException;
import org.openscience.cdk.interfaces.IAtomContainer;
import org.openscience.cdk.io.MDLV2000Writer;
import org.openscience.cdk.layout.StructureDiagramGenerator;
import org.openscience.cdk.qsar.DescriptorValue;
import org.openscience.cdk.qsar.IMolecularDescriptor;
import org.openscience.cdk.qsar.descriptors.molecular.WeightDescriptor;
import org.openscience.cdk.qsar.descriptors.molecular.XLogPDescriptor;
import org.openscience.cdk.qsar.descriptors.molecular.TPSADescriptor;
import org.openscience.cdk.qsar.descriptors.molecular.RotatableBondsCountDescriptor;
import org.openscience.cdk.qsar.result.DoubleResult;
import org.openscience.cdk.qsar.result.IntegerResult;
import org.openscience.cdk.renderer.AtomContainerRenderer;
import org.openscience.cdk.renderer.font.AWTFontManager;
import org.openscience.cdk.renderer.generators.BasicAtomGenerator;
import org.openscience.cdk.renderer.generators.BasicBondGenerator;
import org.openscience.cdk.renderer.generators.BasicSceneGenerator;
import org.openscience.cdk.renderer.generators.IGenerator;
import org.openscience.cdk.renderer.visitor.AWTDrawVisitor;
import org.openscience.cdk.silent.SilentChemObjectBuilder;
import org.openscience.cdk.smiles.SmilesParser;
import org.springframework.stereotype.Service;

import com.iwomi.cdkapp.model.Descriptor;
import com.iwomi.cdkapp.model.Molecule;
import com.iwomi.cdkapp.service.MoleculeService;
import com.iwomi.cdkapp.util.CDKDescriptorLister;

@Service
public class MoleculeServiceImpl implements MoleculeService {

    private final SmilesParser smilesParser;
    private final CDKDescriptorLister descriptorLister;
    
    public MoleculeServiceImpl(CDKDescriptorLister descriptorLister) {
        this.smilesParser = new SmilesParser(SilentChemObjectBuilder.getInstance());
        this.descriptorLister = descriptorLister;
    }
    
    @Override
    public Molecule parseMoleculeFromSmiles(String smiles) {
        try {
            IAtomContainer molecule = smilesParser.parseSmiles(smiles);
            String id = UUID.randomUUID().toString();
            Molecule mol = new Molecule(id, smiles, "");
            
            // Generate the 2D coordinates
            StructureDiagramGenerator sdg = new StructureDiagramGenerator();
            sdg.setMolecule(molecule);
            sdg.generateCoordinates();
            IAtomContainer layoutMolecule = sdg.getMolecule();
            
            // Generate image
            byte[] imageData = generateMoleculeImage(layoutMolecule);
            mol.setImage(imageData);
            
            // Convert to MDL Molfile
            String molfile = convertToMolfile(layoutMolecule);
            mol.setMolfile(molfile);
            
            // Calculate descriptors
            List<Descriptor> descriptors = calculateDescriptors(layoutMolecule);
            mol.setDescriptors(descriptors);
            
            return mol;
        } catch (Exception e) {
            throw new RuntimeException("Error parsing SMILES: " + e.getMessage(), e);
        }
    }

    @Override
    public byte[] generateMoleculeImage(Molecule molecule) {
        try {
            IAtomContainer mol = smilesParser.parseSmiles(molecule.getSmiles());
            StructureDiagramGenerator sdg = new StructureDiagramGenerator();
            sdg.setMolecule(mol);
            sdg.generateCoordinates();
            return generateMoleculeImage(sdg.getMolecule());
        } catch (Exception e) {
            throw new RuntimeException("Error generating molecule image: " + e.getMessage(), e);
        }
    }
    
    private byte[] generateMoleculeImage(IAtomContainer molecule) {
        try {
            // Setup rendering components
            List<IGenerator<IAtomContainer>> generators = new ArrayList<>();
            generators.add(new BasicSceneGenerator());
            generators.add(new BasicBondGenerator());
            generators.add(new BasicAtomGenerator());
            
            // Create the renderer
            AtomContainerRenderer renderer = new AtomContainerRenderer(
                    generators, new AWTFontManager());
            
            // Setup image and draw
            int width = 400;
            int height = 300;
            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2 = image.createGraphics();
            g2.setBackground(Color.WHITE);
            g2.clearRect(0, 0, width, height);
            
            // Paint the background white
            g2.setColor(Color.WHITE);
            g2.fillRect(0, 0, width, height);
            
            // Draw the molecule
            renderer.setup(molecule, new Rectangle(width, height));
            renderer.paint(molecule, new AWTDrawVisitor(g2), 
                    new Rectangle(width, height), true);
            
            // Convert to byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "PNG", baos);
            
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating molecule image: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Descriptor> calculateDescriptors(Molecule molecule) {
        try {
            IAtomContainer mol = smilesParser.parseSmiles(molecule.getSmiles());
            return calculateDescriptors(mol);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating descriptors: " + e.getMessage(), e);
        }
    }
    
    private List<Descriptor> calculateDescriptors(IAtomContainer molecule) {
        List<Descriptor> descriptors = new ArrayList<>();
        
        try {
            // Prepare molecule with atom types and implicit hydrogens if possible
            try {
                // Add hydrogens and atom typing to improve descriptor calculations
                org.openscience.cdk.tools.manipulator.AtomContainerManipulator.percieveAtomTypesAndConfigureAtoms(molecule);
                org.openscience.cdk.tools.manipulator.AtomContainerManipulator.convertImplicitToExplicitHydrogens(molecule);
            } catch (Exception e) {
                // Continue even if molecule preparation fails
                System.err.println("Warning: Could not prepare molecule fully for descriptor calculation: " + e.getMessage());
            }
            
            // Get all available descriptor classes from the descriptor lister
            List<Descriptor> availableDescriptors = descriptorLister.getAllAvailableDescriptors();
            
            for (Descriptor descriptorInfo : availableDescriptors) {
                try {
                    // Load the descriptor class dynamically
                    String className = descriptorInfo.getId();
                    Class<?> descriptorClass = Class.forName(className);
                    Object descriptorInstance = descriptorClass.getDeclaredConstructor().newInstance();
                    
                    if (descriptorInstance instanceof IMolecularDescriptor) {
                        IMolecularDescriptor molecularDescriptor = (IMolecularDescriptor) descriptorInstance;
                        
                        // Calculate the descriptor value
                        DescriptorValue value = molecularDescriptor.calculate(molecule);
                        
                        // Format the result based on the return type
                        String formattedValue = formatDescriptorValue(value);
                        
                        // Create a new descriptor with the calculated value
                        Descriptor calculatedDescriptor = new Descriptor();
                        calculatedDescriptor.setId(descriptorInfo.getId());
                        calculatedDescriptor.setName(descriptorInfo.getName());
                        calculatedDescriptor.setValue(formattedValue);
                        calculatedDescriptor.setDescription(descriptorInfo.getDescription());
                        
                        descriptors.add(calculatedDescriptor);
                    }
                } catch (ClassNotFoundException e) {
                    // Skip descriptors that can't be found
                    continue;
                } catch (Exception e) {
                    // Add a descriptor entry with error information
                    Descriptor errorDescriptor = new Descriptor();
                    errorDescriptor.setId(descriptorInfo.getId());
                    errorDescriptor.setName(descriptorInfo.getName());
                    errorDescriptor.setValue("Error");
                    errorDescriptor.setDescription("Failed to calculate: " + e.getMessage());
                    
                    descriptors.add(errorDescriptor);
                }
            }
            
            return descriptors;
        } catch (Exception e) {
            throw new RuntimeException("Error calculating descriptors: " + e.getMessage(), e);
        }
    }
    
    /**
     * Format descriptor value based on its type
     */
    private String formatDescriptorValue(DescriptorValue value) {
        if (value == null || value.getValue() == null) {
            return "N/A";
        }
        
        Object resultValue = value.getValue();
        
        if (resultValue instanceof DoubleResult) {
            double val = ((DoubleResult) resultValue).doubleValue();
            return String.format("%.4f", val);
        } else if (resultValue instanceof IntegerResult) {
            int val = ((IntegerResult) resultValue).intValue();
            return String.valueOf(val);
        } else if (resultValue instanceof org.openscience.cdk.qsar.result.BooleanResult) {
            boolean val = ((org.openscience.cdk.qsar.result.BooleanResult) resultValue).booleanValue();
            return String.valueOf(val);
        } else if (resultValue instanceof org.openscience.cdk.qsar.result.DoubleArrayResult) {
            org.openscience.cdk.qsar.result.DoubleArrayResult array = 
                    (org.openscience.cdk.qsar.result.DoubleArrayResult) resultValue;
            
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < array.length(); i++) {
                if (i > 0) sb.append(", ");
                sb.append(String.format("%.4f", array.get(i)));
                // Limit array display to prevent overflow
                if (i >= 9 && array.length() > 10) {
                    sb.append(", ... (").append(array.length() - 10).append(" more values)");
                    break;
                }
            }
            sb.append("]");
            return sb.toString();
        } else if (resultValue instanceof org.openscience.cdk.qsar.result.IntegerArrayResult) {
            org.openscience.cdk.qsar.result.IntegerArrayResult array = 
                    (org.openscience.cdk.qsar.result.IntegerArrayResult) resultValue;
            
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < array.length(); i++) {
                if (i > 0) sb.append(", ");
                sb.append(array.get(i));
                // Limit array display to prevent overflow
                if (i >= 9 && array.length() > 10) {
                    sb.append(", ... (").append(array.length() - 10).append(" more values)");
                    break;
                }
            }
            sb.append("]");
            return sb.toString();
        } else {
            // Handle arrays and other result types
            return resultValue.toString();
        }
    }

    @Override
    public String convertToMolfile(Molecule molecule) {
        try {
            IAtomContainer mol = smilesParser.parseSmiles(molecule.getSmiles());
            StructureDiagramGenerator sdg = new StructureDiagramGenerator();
            sdg.setMolecule(mol);
            sdg.generateCoordinates();
            return convertToMolfile(sdg.getMolecule());
        } catch (Exception e) {
            throw new RuntimeException("Error converting to molfile: " + e.getMessage(), e);
        }
    }
    
    private String convertToMolfile(IAtomContainer molecule) {
        try {
            StringWriter writer = new StringWriter();
            MDLV2000Writer mdlWriter = new MDLV2000Writer(writer);
            mdlWriter.write(molecule);
            mdlWriter.close();
            return writer.toString();
        } catch (CDKException | IOException e) {
            throw new RuntimeException("Error converting to molfile: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Descriptor> getAllAvailableDescriptors() {
        return descriptorLister.getAllAvailableDescriptors();
    }
}
