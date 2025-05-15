package com.iwomi.cdkapp.model;

/**
 * Represents a molecular descriptor calculated by CDK
 */
public class Descriptor {
    
    private String id;
    private String name;
    private String value;
    private String description;
    
    public Descriptor() {
    }
    
    public Descriptor(String name, String value, String description) {
        this.name = name;
        this.value = value;
        this.description = description;
    }
    
    // Constructor for descriptor listing
    public Descriptor(String id, String displayName, String description, boolean isForListing) {
        this.id = id;
        this.name = displayName;
        this.description = description;
        this.value = "";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
