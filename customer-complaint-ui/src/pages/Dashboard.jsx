import { useState } from "react";
import Navbar from "../components/Navbar";
import ComplaintForm from "../components/ComplaintForm";
import Copilot from "../components/Copilot";
import ComplaintList from "../components/ComplaintList";

export default function Dashboard() {
  const [aiData, setAiData] = useState(null);

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          padding: "20px",
          background: "#f5f5f5",
        }}
      >
        <div>
          <ComplaintForm aiData={aiData} />
          <ComplaintList />
        </div>

        <Copilot onExtract={setAiData} />
      </div>
    </>
  );
}