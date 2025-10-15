import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import cors from "cors";
import registerRoute from "./register";
import sessionRoute from "./session"

export const prisma = new PrismaClient();
const app = express();
const PORT = 4000;

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Servidor Express + Prisma + SQLite funcionando...");
});

// llamo a register.ts
app.use("/register", registerRoute);
app.use("/session", sessionRoute);

async function main() {
  try {
    await prisma.$connect();
    console.log("==========Base de datos conectada============");

  } catch (error) {
    console.error("Error en main:", error);
  }
}

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  await main();
});

process.on('SIGINT', async () => {
  console.log("\n Cerrando servidor...");
  await prisma.$disconnect();
  console.log(" Base de datos desconectada");
  process.exit(0);
});