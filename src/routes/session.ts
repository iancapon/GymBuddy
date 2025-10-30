import { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();

//login
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ ok: true, mensaje: "Usuario encontrado", token })

  } catch (error) {
    console.error("Error en la busqueda:", error);
    res.status(500).json({
      error: "Error al buscar usuario"
    });
  }
});

export default router;
