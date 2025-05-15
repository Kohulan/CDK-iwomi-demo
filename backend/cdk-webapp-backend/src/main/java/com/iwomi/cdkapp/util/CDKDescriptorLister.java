package com.iwomi.cdkapp.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.openscience.cdk.qsar.IDescriptor;
import org.openscience.cdk.qsar.IMolecularDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.iwomi.cdkapp.model.Descriptor;

/**
 * Utility class to list all available CDK descriptors
 */
@Component
public class CDKDescriptorLister {

    private static final Logger logger = LoggerFactory.getLogger(CDKDescriptorLister.class);
    
    private static Map<String, String> descriptorClassToNameMap = new TreeMap<>();
    
    static {
        // Add custom names for some descriptor classes
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.WeightDescriptor", "Molecular Weight");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.XLogPDescriptor", "XLogP");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.TPSADescriptor", "Topological Polar Surface Area");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.RotatableBondsCountDescriptor", "Rotatable Bonds Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.ALOGPDescriptor", "ALOGP");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.APolDescriptor", "APol");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.AcidicGroupCountDescriptor", "Acidic Group Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.AromaticAtomsCountDescriptor", "Aromatic Atoms Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.AromaticBondsCountDescriptor", "Aromatic Bonds Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.AtomCountDescriptor", "Atom Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.BasicGroupCountDescriptor", "Basic Group Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.BondCountDescriptor", "Bond Count");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.ChiIndexUtils", "Chi Index Utils");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.CarbonTypesDescriptor", "Carbon Types");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.EccentricConnectivityIndexDescriptor", "Eccentric Connectivity Index");
        descriptorClassToNameMap.put("org.openscience.cdk.qsar.descriptors.molecular.FMFDescriptor", "FMF Descriptor");
        // Add more as needed...
    }
    
    public CDKDescriptorLister() {
        // Default constructor
    }
    
    /**
     * Get a list of all available CDK descriptors
     * @return A list of descriptor information
     */
    public List<Descriptor> getAllAvailableDescriptors() {
        List<Descriptor> descriptors = new ArrayList<>();
        
        try {
            logger.info("Collecting all available CDK descriptors...");
            
            // Get all available molecular descriptors directly from the class path
            String[] descriptorClasses = {
                "org.openscience.cdk.qsar.descriptors.molecular.ALOGPDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.APolDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.AcidicGroupCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.AromaticAtomsCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.AromaticBondsCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.AtomCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.AutocorrelationDescriptorCharge",
                "org.openscience.cdk.qsar.descriptors.molecular.AutocorrelationDescriptorMass",
                "org.openscience.cdk.qsar.descriptors.molecular.AutocorrelationDescriptorPolarizability",
                "org.openscience.cdk.qsar.descriptors.molecular.BasicGroupCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.BCUTDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.BondCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.BPol",
                "org.openscience.cdk.qsar.descriptors.molecular.CarbonTypesDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.CPSADescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.ChiIndexUtils",
                "org.openscience.cdk.qsar.descriptors.molecular.ChiPathClusterDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.ChiPathDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.EccentricConnectivityIndexDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.FMFDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.FragmentComplexityDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.HBondAcceptorCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.HBondDonorCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.KappaShapeIndicesDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.KierHallSmartsDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.LargestChainDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.LargestPiSystemDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.LengthOverBreadthDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.LongestAliphaticChainDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.MDEDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.MomentOfInertiaDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.PetitjeanNumberDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.PetitjeanShapeIndexDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.RotatableBondsCountDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.RuleOfFiveDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.SmallRingDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.TPSADescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.VAdjMaDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.WeightDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.WHIMDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.WienerNumbersDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.XLogPDescriptor",
                "org.openscience.cdk.qsar.descriptors.molecular.ZagrebIndexDescriptor"
            };
            
            for (String className : descriptorClasses) {
                try {
                    Class<?> descriptorClass = Class.forName(className);
                    Object instance = descriptorClass.getDeclaredConstructor().newInstance();
                    
                    if (instance instanceof IMolecularDescriptor) {
                        IMolecularDescriptor descriptor = (IMolecularDescriptor) instance;
                        String descriptorName = getFriendlyDescriptorName(className);
                        String description = getDescriptionFromDescriptor(descriptor);
                        
                        descriptors.add(new Descriptor(className, descriptorName, description, true));
                    }
                } catch (ClassNotFoundException e) {
                    logger.warn("Descriptor class not found: {}", className);
                } catch (Exception e) {
                    logger.warn("Error instantiating descriptor {}: {}", className, e.getMessage());
                }
            }
            
            logger.info("Found {} available descriptors", descriptors.size());
        } catch (Exception e) {
            logger.error("Error getting CDK descriptors", e);
        }
        
        return descriptors;
    }
    
    /**
     * Get a friendly name for a descriptor class
     * @param className The fully qualified class name
     * @return A user-friendly name
     */
    private String getFriendlyDescriptorName(String className) {
        // Check if we have a predefined name
        if (descriptorClassToNameMap.containsKey(className)) {
            return descriptorClassToNameMap.get(className);
        }
        
        // If not, extract from class name
        String simpleName = className.substring(className.lastIndexOf('.') + 1);
        // Remove "Descriptor" suffix if present
        if (simpleName.endsWith("Descriptor")) {
            simpleName = simpleName.substring(0, simpleName.length() - 10);
        }
        
        // Convert camel case to space-separated words
        String result = simpleName.replaceAll("([a-z])([A-Z])", "$1 $2");
        return result;
    }
    
    /**
     * Extract description from descriptor specification
     * @param descriptor The descriptor instance
     * @return A description string
     */
    private String getDescriptionFromDescriptor(IDescriptor descriptor) {
        // Map of descriptor class names to human-readable descriptions
        Map<String, String> descriptorDescriptions = new TreeMap<>();
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.ALOGPDescriptor", "Calculates Ghose-Crippen LogKow (octanol/water partition coefficient) and other descriptors related to molecular hydrophobicity");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.APolDescriptor", "Sum of the atomic polarizabilities");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.AcidicGroupCountDescriptor", "Returns the number of acidic groups in a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.AromaticAtomsCountDescriptor", "Returns the number of aromatic atoms in a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.AromaticBondsCountDescriptor", "Returns the number of aromatic bonds in a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.AtomCountDescriptor", "Returns the number of atoms of a given element type in a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.BCUTDescriptor", "Eigenvalue-based descriptor that reflects atomic properties relevant to intermolecular interactions");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.BondCountDescriptor", "Returns the number of bonds of a certain bond order");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.TPSADescriptor", "Calculation of topological polar surface area based on fragment contributions");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.XLogPDescriptor", "Calculates the XLogP value for a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.WeightDescriptor", "Calculates the molecular weight");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.RotatableBondsCountDescriptor", "Returns the number of rotatable bonds in a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.RuleOfFiveDescriptor", "Evaluates Lipinski's Rule of Five: molecular weight, logP, H-bond donors, H-bond acceptors");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.HBondAcceptorCountDescriptor", "Returns the number of hydrogen bond acceptors in a molecule");
        descriptorDescriptions.put("org.openscience.cdk.qsar.descriptors.molecular.HBondDonorCountDescriptor", "Returns the number of hydrogen bond donors in a molecule");
        
        // Try to get description from the map
        String className = descriptor.getClass().getName();
        if (descriptorDescriptions.containsKey(className)) {
            return descriptorDescriptions.get(className);
        }
        
        try {
            // If not in the map, try to extract from specification
            String[] specs = descriptor.getSpecification().getSpecificationReference().split("\\$");
            if (specs.length > 1) {
                return specs[1].trim();
            }
            
            String title = descriptor.getSpecification().getImplementationTitle();
            if (title != null && !title.isEmpty()) {
                return title;
            }
            
            // Fall back to class name-based description
            return "Descriptor that calculates " + getFriendlyDescriptorName(className) + " properties";
            
        } catch (Exception e) {
            logger.warn("Could not extract description for {}", descriptor.getClass().getName());
            return "Molecular descriptor from CDK";
        }
    }
    
    /**
     * Main method for testing
     * @param args Command line arguments (not used)
     */
    public static void main(String[] args) {
        CDKDescriptorLister lister = new CDKDescriptorLister();
        List<Descriptor> descriptors = lister.getAllAvailableDescriptors();
        
        System.out.println("Available CDK Descriptors in version " + 
                org.openscience.cdk.CDKConstants.class.getPackage().getImplementationVersion());
        System.out.println("-------------------------------------------");
        
        for (Descriptor descriptor : descriptors) {
            System.out.printf("%-50s | %s%n", descriptor.getName(), descriptor.getId());
        }
    }
}