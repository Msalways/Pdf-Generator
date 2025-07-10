import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useGenerateReportMutation from "@/lib/hooks/Reports/useGenerateReportMutation";
import { toast } from "sonner";
import Swal from "sweetalert2";

const GenerateReport = () => {
  const [sessionId, setSessionId] = useState("");
  const generateReportMuation = useGenerateReportMutation();

  const handleGenerateReport = async () => {
    if (!sessionId.trim()) {
      alert("Please enter a valid Session ID");
      return;
    }

    // Replace this with actual navigation or API call
    console.log("Generating report for Session ID:", sessionId);
    try {
      const response = await generateReportMuation.mutateAsync({ sessionId });
      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Report generated successfully",
        confirmButtonText: "OK",
        backdrop: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/Report";
        }
      });
    } catch (error: any) {
      console.error("Error generating report:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message ?? "Failed to generate report",
        confirmButtonText: "OK",
        backdrop: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Generate Report</h1>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Enter Session ID"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
          />
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReport;
