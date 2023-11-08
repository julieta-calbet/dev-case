import { z } from "zod";

// Equipment
export const equipmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startingAndWindingTime: z.coerce.number().min(1),
});

export type EquipmentType = z.infer<typeof equipmentSchema>;
