"use server";

import { prisma } from "./prisma";

export async function createStatus(status: any) {
  try {
    const data = await prisma.status.create({ data: status });
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function getAllStatus(eqId: string) {
  try {
    const data = await prisma.status.findMany({
      where: { equipmentId: eqId },
    });
    return { data };
  } catch (error) {
    return { error };
  }
}
