import React, { useState, useEffect } from "react";
import api from "../utils/api";
import EquipmentForm from "./EquipmentForm";
import { FaEdit, FaTrashAlt, FaTools } from "react-icons/fa";

const ManageEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/equipment");
      setEquipment(res.data);
    } catch (err) {
      console.error("Error loading equipment:", err);
      setError("Unable to load equipment. Please check server connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    try {
      await api.post("/equipment", data);
      loadEquipment();
    } catch (err) {
      console.error("Error adding equipment:", err);
      alert("Failed to add equipment. Check backend connection or data.");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.put(`/equipment/${editing.id}`, data);
      setEditing(null);
      loadEquipment();
    } catch (err) {
      console.error("Error updating equipment:", err);
      alert("Failed to update equipment. Please retry.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`/equipment/${id}`);
      loadEquipment();
    } catch (err) {
      console.error("Error deleting equipment:", err);
      alert("Failed to delete equipment.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-gradient">
          <FaTools className="me-2 text-primary" />
          Equipment Management
        </h2>
        <p className="text-muted">
          Add, update, or delete lab and classroom equipment easily.
        </p>
      </div>

      {/* Error or Loading */}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && (
        <div className="text-center text-muted py-3">Loading equipment...</div>
      )}

      {/* Equipment Form */}
      <div className="card shadow-sm border-0 p-4 mb-4 form-card">
        <h5 className="mb-3 text-secondary">
          {editing ? "Edit Equipment" : "Add New Equipment"}
        </h5>
        <EquipmentForm
          onSubmit={editing ? handleUpdate : handleAdd}
          existingData={editing}
        />
      </div>

      {/* Equipment Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-hover align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Condition</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {equipment.length > 0 ? (
              equipment.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold">{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.condition}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.available ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {item.available ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => setEditing(item)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted py-4">
                  <div className="p-3 bg-light rounded shadow-sm">
                    No equipment found. Add a new item to get started!
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(45deg, #007bff, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .form-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .form-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        button {
          transition: all 0.2s ease;
        }
        button:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ManageEquipment;
