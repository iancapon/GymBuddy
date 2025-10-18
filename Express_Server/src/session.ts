import { Router, Request, Response } from "express";
import { prisma } from "./index";

const router = Router();


router.post("/session", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        password,
      }
    });

    if (existingUser) { //////////////////////// se encontró el usuario
      return res.status(200).json({
        ok: true,
        mensaje: "Usuario encontrado",
        data: existingUser,
      });
    }

    if (!existingUser) { //////////////////////// no se encontró el usuario
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado",
      });
    }


  } catch (error) {
    console.error("Error en la busqueda:", error);
    res.status(500).json({
      error: "Error al buscar usuario"
    });
  }
});

export default router;
