import { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import { verificarToken, AuthRequest } from "../verificar";


const router = Router();

router.post("/", verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    //const { id } = req.body;
    const id = req.user.id;

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
