package com.iwomi.cdkapp.model;

import java.util.List;

/**
 * Represents a molecule with its properties and computed descriptors
 */
public class Molecule {
    
    private String id;
    private String smiles;
    private String name;
    private String molfile;
    private byte[] image;
    private List<Descriptor> descriptors;
    
    public Molecule() {
    }
    
    public Molecule(String id, String smiles, String name) {
        this.id = id;
        this.smiles = smiles;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSmiles() {
        return smiles;
    }

    public void setSmiles(String smiles) {
        this.smiles = smiles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMolfile() {
        return molfile;
    }

    public void setMolfile(String molfile) {
        this.molfile = molfile;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public List<Descriptor> getDescriptors() {
        return descriptors;
    }

    public void setDescriptors(List<Descriptor> descriptors) {
        this.descriptors = descriptors;
    }
}
