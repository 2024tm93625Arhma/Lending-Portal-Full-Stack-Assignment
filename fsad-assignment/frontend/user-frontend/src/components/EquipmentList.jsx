import React, { useEffect, useState } from "react";
import api from "../utils/api";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await api.get("/equipment");
      setEquipment(res.data);
    } catch (err) {
      console.error("Error fetching equipment", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Equipment</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Condition</th>
            <th>Quantity</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.condition}</td>
              <td>{item.quantity}</td>
              <td>{item.available ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;
