import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { connect } from 'http2';
import { verificarToken, AuthRequest } from '../verificar';

const router = Router();

// get todas las rutinas historicas
router.get("/", verificarToken, async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user.id

        const data = await prisma.history.findMany({
            where: { userId: Number(id) },
            include: {
                Routine: true
            },
            orderBy: { fecha: "desc" }
        });

        if (!data) {
            return res.status(404).json({ success: false, message: "Historial no encontrado" });
        }

        console.log(data)
        console.log(req.query)
        return res.json({ ok: true, data });

    } catch (error) {
        console.error('Error fetching routine history:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el historial',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }

})

//postear una rutina a la historia
router.post("/", verificarToken, async (req: AuthRequest, res: Response) => {
    const { routineId } = req.body
    const id = req.user.id
    const hoy = new Date()

    if (!id || !routineId) {
        return res.status(400).json({ ok: false, mensaje: "Faltan userId o routineId" })
    }
    try {
        const history = await prisma.history.create({
            data: {
                User: { connect: { id: Number(id) } },
                Routine: { connect: { id: Number(routineId) } },
                fecha: hoy
            },
        })

        if (!history) {
            return res.status(400).json({ ok: false, mensaje: "prisma no respondió el llamado a crear la historia" })
        }

        return res.status(201).json({ ok: true, history })

    } catch (error) {
        console.error("Error creando historia:", error);
        return res.status(500).json({
            ok: false,
            error: error instanceof Error ? error.message : String(error)
        });
    }
})

export default router