import { useState } from "react";
import api from "../api/api";

export default function Copilot({ onExtract }) {
  const [complaint, setComplaint] = useState("");
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload PDF
  const uploadPdf = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      // Step 1: Extract text from PDF
      const pdfRes = await api.post("/pdf/extract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const text = pdfRes.data.text;

      // Show extracted text in textarea
      setComplaint(text);

      // Step 2: Send extracted text to AI
      const aiRes = await api.post("/ai/extract", {
        complaint: text,
      });
      const analysisRes = await api.post("/ai/analyze", {
  complaint: text,
});

setAnalysis(analysisRes.data);

      setResult(aiRes.data);

      // Autofill complaint form
      if (onExtract) {
        onExtract(aiRes.data);
      }
    } catch (err) {
      console.error(err);
      alert("PDF processing failed");
    } finally {
      setLoading(false);
    }
  };

  // Manual complaint extraction
  const extractComplaint = async () => {
    try {
      setLoading(true);

      const res = await api.post("/ai/extract", {
        complaint: complaint,
      });
      const analysisRes = await api.post("/ai/analyze", {
  complaint: complaint,
});

setAnalysis(analysisRes.data);

      setResult(res.data);

      // Autofill complaint form
      if (onExtract) {
        onExtract(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("AI extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        height: "650px",
      }}
    >
      <h2>AIVOA Copilot</h2>

      <div
        style={{
          border: "1px solid #ddd",
          height: "250px",
          marginBottom: "20px",
          padding: "10px",
          overflowY: "auto",
          background: "#f8f8f8",
        }}
      >
        {analysis ? (
  <>
    <h3>AI Complaint Analysis</h3>

    <p><b>Category:</b> {analysis.category}</p>

    <p><b>Severity:</b> {analysis.severity}</p>

    <p><b>Risk Score:</b></p>
    <p>{analysis.risk_score}</p>

    <p><b>Summary:</b></p>
    <p>{analysis.summary}</p>

    <p><b>CAPA:</b></p>
    <p>{analysis.capa}</p>
  </>
) : (
  "AI Chat..."
)}
      </div>

      <textarea
        placeholder="Type a complaint..."
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={extractComplaint}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        {loading ? "Extracting..." : "Extract Complaint"}
      </button>

      <input
        type="file"
        accept=".pdf"
        onChange={uploadPdf}
      />
    </div>
  );
}