import { z } from "zod";

// Equipment
export const equipmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startingAndWindingTime: z.coerce.number().min(1),
});

export type EquipmentType = z.infer<typeof equipmentSchema>;

// Order
export const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  productionTime: z.coerce.number().min(1),
});

export type OrderType = z.infer<typeof orderSchema>;

// Status
export type StatusType = {
  id: Number;
  order: String;
  status: string;
  productionTime: Number;
  startedAt: Date;
  equipmentId?: String;
  equipment?: EquipmentType;
};
