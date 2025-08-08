type APIConfig = {
  fileserverHits: number;
  dbURL: string;
};

process.loadEnvFile(".env");
if (!process.env.DB_URL) {
  throw new Error("Missing environment variable: DB_URL");
}

export const config: APIConfig = {
  fileserverHits: 0,
  dbURL: process.env.DB_URL,
};
