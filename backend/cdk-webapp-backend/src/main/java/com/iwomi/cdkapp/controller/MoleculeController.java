package com.iwomi.cdkapp.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iwomi.cdkapp.model.Descriptor;
import com.iwomi.cdkapp.model.Molecule;
import com.iwomi.cdkapp.service.MoleculeService;
import com.iwomi.cdkapp.util.CDKDescriptorLister;

@RestController
@RequestMapping("/api/molecules")
@CrossOrigin(origins = "*") // For development only, restrict in production
public class MoleculeController {
    
    private final MoleculeService moleculeService;
    private final CDKDescriptorLister descriptorLister;
    
    @Autowired
    public MoleculeController(MoleculeService moleculeService, CDKDescriptorLister descriptorLister) {
        this.moleculeService = moleculeService;
        this.descriptorLister = descriptorLister;
    }
    
    @PostMapping(value = "/parse", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> parseMolecule(@RequestBody Map<String, String> request) {
        try {
            String smiles = request.get("smiles");
            if (smiles == null || smiles.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "SMILES string is required"));
            }
            
            Molecule molecule = moleculeService.parseMoleculeFromSmiles(smiles);
            
            // Convert image to Base64 for JSON response
            String imageBase64 = Base64.getEncoder().encodeToString(molecule.getImage());
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", molecule.getId());
            response.put("smiles", molecule.getSmiles());
            response.put("molfile", molecule.getMolfile());
            response.put("imageBase64", imageBase64);
            response.put("descriptors", molecule.getDescriptors());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error processing molecule: " + e.getMessage()));
        }
    }
    
    @GetMapping(value = "/health", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "CDK Backend API is running");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping(value = "/image", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getMoleculeImage(@RequestParam String smiles) {
        try {
            if (smiles == null || smiles.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            
            Molecule molecule = new Molecule();
            molecule.setSmiles(smiles);
            
            byte[] imageData = moleculeService.generateMoleculeImage(molecule);
            return ResponseEntity.ok(imageData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping(value = "/descriptors", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Descriptor>> getAllDescriptors() {
        try {
            List<Descriptor> descriptors = moleculeService.getAllAvailableDescriptors();
            return ResponseEntity.ok(descriptors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
