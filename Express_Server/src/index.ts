import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import cors from "cors";
import registerRoute from "./register";

export const prisma = new PrismaClient();
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Servidor Express + Prisma + SQLite funcionando...");
});

// llamo a register.ts
app.use("/api", registerRoute);

async function main() {
  try {
    await prisma.$connect();
    console.log("==========Base de datos conectada============");

    // opcional: puedo testear un seed
    
    const user = await prisma.user.create({
      data: {
        nombre: "Pedrito",
        apellido: "Gomez",
        DNI: 123456789,
        email: "pedrito01@gmail.com",
        telefono: 987654321,
        edad: 25,
        posts: {
          create: {
            nombre: "Pedrito",
            apellido: "Gomez",
            DNI: 123456789,
            email: "pedrito01@gmail.com",
            telefono: 987654321,
            edad: 25,
          },
        },
      },
      include: { posts: true },
    });
    console.log("Usuario creado:", user);
    
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