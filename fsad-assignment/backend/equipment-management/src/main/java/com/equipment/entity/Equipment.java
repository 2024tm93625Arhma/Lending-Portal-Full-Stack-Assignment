// src/main/java/com/equipment/entity/Equipment.java
package main.java.com.equipment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // e.g., Sports, Lab, Camera, Music

    private String condition; // Good, Fair, Needs Repair

    @Column(nullable = false)
    private int totalQuantity;

    @Column(nullable = false)
    private int availableQuantity;

    // Helper to check if item is available
    public boolean isAvailable() {
        return availableQuantity > 0;
    }

    // Decrease available count
    public void lendOne() {
        if (availableQuantity > 0) availableQuantity--;
    }

    // Increase available count
    public void returnOne() {
        if (availableQuantity < totalQuantity) availableQuantity++;
    }
}