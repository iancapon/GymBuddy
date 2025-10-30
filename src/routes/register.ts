import { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { verificarToken, AuthRequest } from "../verificar";


const router = Router();


router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, dni, email, password, telefono, edad } = req.body;

    // Validaciones
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { DNI: BigInt(dni) }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        error: "El usuario ya existe con ese email o DNI"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crecion de usuario:
    const user = await prisma.user.create({
      data: {
        nombre,
        apellido,
        DNI: BigInt(dni),
        email,
        password: hashedPassword,
        telefono: BigInt(telefono),
        edad: parseInt(edad),
      },
    });

    const userResponse = {
      ...user,
      DNI: user.DNI.toString(),
      telefono: user.telefono.toString(),
      userId: user.id
    };

    const token = jwt.sign(userResponse, process.env.JWT_SECRET!, { expiresIn: "7d" })

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token
    });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      error: "Error al registrar usuario"
    });
  }
});

export default router;
