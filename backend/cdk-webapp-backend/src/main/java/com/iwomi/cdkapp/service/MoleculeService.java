package com.iwomi.cdkapp.service;

import java.util.List;

import com.iwomi.cdkapp.model.Descriptor;
import com.iwomi.cdkapp.model.Molecule;

/**
 * Service interface for molecule operations
 */
public interface MoleculeService {
    
    /**
     * Parse a molecule from SMILES notation
     * @param smiles the SMILES string
     * @return a Molecule object
     */
    Molecule parseMoleculeFromSmiles(String smiles);
    
    /**
     * Generate a 2D depiction of a molecule
     * @param molecule the molecule to depict
     * @return the molecule with image data
     */
    byte[] generateMoleculeImage(Molecule molecule);
    
    /**
     * Calculate molecular descriptors for a molecule
     * @param molecule the molecule
     * @return a list of descriptor values
     */
    List<Descriptor> calculateDescriptors(Molecule molecule);
    
    /**
     * Convert a molecule to MDL Molfile format
     * @param molecule the molecule
     * @return the MDL Molfile as a string
     */
    String convertToMolfile(Molecule molecule);
    
    /**
     * Get a list of all available descriptors in CDK
     * @return list of all descriptors
     */
    List<Descriptor> getAllAvailableDescriptors();
}
