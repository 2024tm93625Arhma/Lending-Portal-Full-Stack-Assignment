// src/main/java/com/equipment/dto/EquipmentRequest.java
package main.java.com.equipment.dto;

import lombok.Data;

@Data
public class EquipmentRequest {
    private String name;
    private String category;
    private String condition;
    private int totalQuantity;
    private int availableQuantity;
}