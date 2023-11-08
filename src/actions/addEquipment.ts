"use server";

import { createEquipment } from "@/lib/equipment";
import { revalidatePath } from "next/cache";

export async function addEquipment(formData: any) {
  await createEquipment(formData);
  revalidatePath("/");
}
