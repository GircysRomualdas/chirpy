import { db } from "../index.js";
import { asc, desc, eq } from "drizzle-orm";
import { chirps } from "../schema.js";
export async function createChirp(chirp) {
    const [result] = await db.insert(chirps).values(chirp).returning();
    return result;
}
export async function getAllChirps(order = "asc") {
    const orderByFn = order === "asc" ? asc : desc;
    const result = await db
        .select()
        .from(chirps)
        .orderBy(orderByFn(chirps.createdAt));
    return result;
}
export async function getChirpById(id) {
    const [result] = await db.select().from(chirps).where(eq(chirps.id, id));
    return result;
}
export async function deleteChirp(id) {
    await db.delete(chirps).where(eq(chirps.id, id));
}
