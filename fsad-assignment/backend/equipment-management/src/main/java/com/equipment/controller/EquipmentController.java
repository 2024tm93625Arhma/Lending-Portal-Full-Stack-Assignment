package main.java.com.equipment.controller;

import main.java.com.equipment.dto.EquipmentRequest;
import main.java.com.equipment.entity.Equipment;
import main.java.com.equipment.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin(origins = "http://localhost:3000")
public class EquipmentController {

    @Autowired
    private EquipmentService service;

    // 🟢 Anyone (authenticated) can view all equipment
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Equipment> getAll() {
        return service.getAllEquipment();
    }

    // 🟢 View available equipment
    @GetMapping("/available")
    @PreAuthorize("isAuthenticated()")
    public List<Equipment> getAvailable() {
        return service.getAvailableEquipment();
    }

    // 🟢 View by category
    @GetMapping("/category/{category}")
    @PreAuthorize("isAuthenticated()")
    public List<Equipment> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    // 🟢 View single item
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public Equipment getById(@PathVariable Long id) {
        return service.getEquipmentById(id);
    }

    // 🟡 ADMIN ONLY: Add new equipment
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Equipment add(@RequestBody EquipmentRequest request) {
        return service.addEquipment(request);
    }

    // 🟡 ADMIN ONLY: Update equipment
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Equipment update(@PathVariable Long id, @RequestBody EquipmentRequest request) {
        return service.updateEquipment(id, request);
    }

    // 🟡 ADMIN ONLY: Delete equipment
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.deleteEquipment(id);
    }
}