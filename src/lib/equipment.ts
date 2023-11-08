import { prisma } from "./prisma";

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
