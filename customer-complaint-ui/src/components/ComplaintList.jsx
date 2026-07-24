import { useEffect, useState } from "react";
import api from "../api/api";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/");
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Complaint History</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#2563eb",
              color: "white",
            }}
          >
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Customer</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Product</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Priority</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length > 0 ? (
            complaints.map((c) => (
              <tr key={c.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                  {c.id}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {c.customer_name}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {c.product_name}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                  {c.priority}
                </td>

                <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                  {c.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  border: "1px solid #ddd",
                }}
              >
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}