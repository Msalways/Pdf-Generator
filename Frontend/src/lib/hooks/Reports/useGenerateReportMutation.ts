import { generateReport } from "@/api/Reports";
import { useMutation } from "@tanstack/react-query";

const useGenerateReportMutation = () => {
  return useMutation({
    mutationFn: async (payload: { sessionId: string }) =>
      await generateReport(payload),
  });
};

export default useGenerateReportMutation;
