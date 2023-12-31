import { prisma } from "./prisma";
import type { EquipmentType } from "./types";

export async function getEquipments(limit?: number) {
  try {
    const all = await prisma.equipment.findMany({
      take: limit ?? 10,
    });
    return { data: all };
  } catch (error) {
    return { error };
  }
}

export async function getEquipment(eqId?: string) {
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id: eqId },
    });
    return { data: equipment };
  } catch (error) {
    return { error };
  }
}

export async function createEquipment(equipment: EquipmentType) {
  try {
    await prisma.equipment.create({ data: equipment });
  } catch (error) {
    {
      error;
    }
  }
}
