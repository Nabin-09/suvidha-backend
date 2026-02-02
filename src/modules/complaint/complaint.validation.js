import { z } from "zod";

export const complaintSchema = z.object({
  serviceType: z.enum(["water", "electricity", "gas"]),
  category: z.string().min(3),
  description: z.string().min(5)
});
