// src/main/java/com/equipment/service/EquipmentService.java
package main.java.com.equipment.service;

import main.java.com.equipment.dto.EquipmentRequest;
import main.java.com.equipment.entity.Equipment;
import main.java.com.equipment.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository repo;

    // ADMIN: Add new equipment
    public Equipment addEquipment(EquipmentRequest request) {
        Equipment equipment = Equipment.builder()
                .name(request.getName())
                .category(request.getCategory())
                .condition(request.getCondition())
                .totalQuantity(request.getTotalQuantity())
                .availableQuantity(request.getAvailableQuantity())
                .build();
        return repo.save(equipment);
    }

    // ADMIN: Update equipment
    public Equipment updateEquipment(Long id, EquipmentRequest request) {
        Equipment existing = getEquipmentById(id);
        existing.setName(request.getName());
        existing.setCategory(request.getCategory());
        existing.setCondition(request.getCondition());
        existing.setTotalQuantity(request.getTotalQuantity());
        existing.setAvailableQuantity(request.getAvailableQuantity());
        return repo.save(existing);
    }

    // ADMIN: Delete equipment
    public void deleteEquipment(Long id) {
        repo.deleteById(id);
    }

    // ALL ROLES: View all equipment
    public List<Equipment> getAllEquipment() {
        return repo.findAll();
    }

    // ALL ROLES: View available only
    public List<Equipment> getAvailableEquipment() {
        return repo.findAllAvailable();
    }

    // ALL ROLES: View by ID
    public Equipment getEquipmentById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipment not found: " + id));
    }

    // ALL ROLES: View by category
    public List<Equipment> getByCategory(String category) {
        return repo.findByCategory(category);
    }
}