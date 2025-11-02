// src/main/java/com/equipment/repository/EquipmentRepository.java
package main.java.com.equipment.repository;

import main.java.com.equipment.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    List<Equipment> findByCategory(String category);

    @Query("SELECT e FROM Equipment e WHERE e.availableQuantity > 0")
    List<Equipment> findAllAvailable();
}