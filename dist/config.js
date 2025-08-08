process.loadEnvFile(".env");
if (!process.env.DB_URL) {
    throw new Error("Missing environment variable: DB_URL");
}
export const config = {
    fileserverHits: 0,
    dbURL: process.env.DB_URL,
};
