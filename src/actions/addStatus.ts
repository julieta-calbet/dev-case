"use server";

import { createStatus } from "@/lib/status";
import { revalidatePath } from "next/cache";

export async function addStatus(equipment: any, formData: any) {
  const { id, startingAndWindingTime } = equipment;

  // red status
  const redTime = new Date();
  const data = await createStatus({
    order: formData.name,
    status: "red",
    startedAt: redTime,
    productionTime: formData.productionTime,
    equipmentId: id,
  });

  // yellow status
  const yellowTime = new Date(
    redTime.setSeconds(redTime.getSeconds() + formData.productionTime)
  );
  await createStatus({
    order: formData.name,
    status: "yellow",
    startedAt: yellowTime,
    productionTime: formData.productionTime,
    equipmentId: id,
  });

  // green status
  const greenTime = new Date(
    yellowTime.setSeconds(yellowTime.getSeconds() + startingAndWindingTime)
  );
  await createStatus({
    order: formData.name,
    status: "green",
    startedAt: greenTime,
    productionTime: formData.productionTime,
    equipmentId: id,
  });

  revalidatePath(`/equipment/${id}`);

  return data;
}
