import { useEffect, useState } from "react";
import api from "../api/api";

export default function ComplaintForm({ aiData }) {
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    product_name: "",
    batch_number: "",
    manufacturing_date: "",
    expiry_date: "",
    description: "",
    priority: "Medium",
  });

  useEffect(() => {
    if (aiData) {
      setForm((prev) => ({
        ...prev,
        ...aiData,
        priority: aiData.priority || "Medium",
      }));
    }
  }, [aiData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveComplaint = async () => {
    try {
      const res = await api.post("/complaints/", form);
      alert("Complaint Saved!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error saving complaint");
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h2>Complaint Form</h2>

      <input
        name="customer_name"
        placeholder="Customer Name"
        value={form.customer_name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="product_name"
        placeholder="Product Name"
        value={form.product_name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="batch_number"
        placeholder="Batch Number"
        value={form.batch_number}
        onChange={handleChange}
      />

      <br /><br />

      <label>Manufacturing Date</label>
      <br />

      <input
        type="date"
        name="manufacturing_date"
        value={form.manufacturing_date || ""}
        onChange={handleChange}
      />

      <br /><br />

      <label>Expiry Date</label>
      <br />

      <input
        type="date"
        name="expiry_date"
        value={form.expiry_date || ""}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="description"
        rows="5"
        placeholder="Complaint Description"
        value={form.description}
        onChange={handleChange}
        style={{ width: "100%" }}
      />

      <br /><br />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <br /><br />

      <button onClick={saveComplaint}>
        Save Complaint
      </button>
    </div>
  );
}