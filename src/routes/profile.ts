import { Router, Request, Response } from "express";
import { prisma } from "../prisma";



const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) return res.status(200).json({ ok: true, mensaje: "Usuario encontrado", data: user })

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});



export default router;
