import React, { useState, useEffect } from "react";

const EquipmentForm = ({ onSubmit, existingData }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    condition: "",
    quantity: 1,
    available: true,
  });

  useEffect(() => {
    if (existingData) setForm(existingData);
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        className="form-control mb-2"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        className="form-control mb-2"
        name="condition"
        value={form.condition}
        onChange={handleChange}
        placeholder="Condition"
        required
      />
      <input
        className="form-control mb-2"
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
        />
        <label className="form-check-label">Available</label>
      </div>
      <button type="submit" className="btn btn-primary">
        {existingData ? "Update" : "Add"} Equipment
      </button>
    </form>
  );
};

export default EquipmentForm;
