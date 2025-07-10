import { generateDynamicReport } from "@/api/Reports";
import { useMutation } from "@tanstack/react-query";

export const useGenerateDynamicReportMutation = () => {
  return useMutation({
    mutationFn: async (payload: object) => await generateDynamicReport(payload),
  });
};
