import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import useGenerateReportMutation from "@/lib/hooks/Reports/useGenerateReportMutation";
import { useGenerateDynamicReportMutation } from "@/lib/hooks/Reports/useGenerateDynamicReportMutation";

const GenerateReport = () => {
  const [sessionId, setSessionId] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const generateReportMutation = useGenerateReportMutation();
  const generateDynamicReportMutation = useGenerateDynamicReportMutation();

  const handleGenerateReport = async () => {
    if (!sessionId.trim()) {
      Swal.fire(
        "Missing Session ID",
        "Please enter a valid Session ID",
        "error"
      );
      return;
    }

    try {
      const response = await generateReportMutation.mutateAsync({ sessionId });
      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Report generated successfully",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message ?? "Report generation failed",
      });
    }
  };

  const handleGenerateFromJson = async () => {
    if (!jsonInput.trim()) {
      Swal.fire("Missing Data", "Please paste valid JSON data", "error");
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);

      await generateDynamicReportMutation.mutateAsync({ jsonData: parsedJson });

      Swal.fire(
        "Success",
        "Report generated successfully from JSON",
        "success"
      ).then(() => {
        window.location.href = "/Report";
      });
    } catch (error: any) {
      Swal.fire(
        "Invalid JSON",
        error.message ?? "Invalid JSON data provided",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Generate Report</h1>

        <Tabs defaultValue="session" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="session">By Session ID</TabsTrigger>
            <TabsTrigger value="json">By JSON Data</TabsTrigger>
          </TabsList>

          <TabsContent value="session">
            <CardContent className="flex flex-col gap-4">
              <Input
                placeholder="Enter Session ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
              />
              <Button
                onClick={handleGenerateReport}
                disabled={generateReportMutation.isPending}
              >
                {generateReportMutation.isPending
                  ? "Generating..."
                  : "Generate Report"}
              </Button>
            </CardContent>
          </TabsContent>

          <TabsContent value="json">
            <CardContent className="flex flex-col gap-4">
              <Textarea
                placeholder="Paste your JSON data here"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={8}
              />
              <Button
                onClick={handleGenerateFromJson}
                disabled={generateDynamicReportMutation.isPending}
              >
                {generateDynamicReportMutation.isPending
                  ? "Generating..."
                  : "Generate from JSON"}
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default GenerateReport;
