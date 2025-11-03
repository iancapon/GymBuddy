import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { verificarToken, AuthRequest } from '../verificar';

const router = Router();

interface CreateRoutineRequest extends Request {
  body: {
    userId: number;
    nombre: string;
  };
}

interface CreateExerciseRequest extends Request {
  body: {
    routineId: number;
    titulo: string;
    media?: string;
    series?: number
    repesXserie?: number
    tiempoXserie?: number
    descansoXserie?: number
  };
}

// ============================================================
// CREATE a new routine
// ============================================================
router.post('/routine', verificarToken, async (req: AuthRequest, res: Response) => {
  const { nombre } = req.body;
  const id = req.user.id

  try {
    const rutina = await prisma.routine.create({
      data: { userId: Number(id), nombre },
    });
    return res.json({ success: true, routine: rutina });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Error al crear rutina' });
  }
});

// ============================================================
// CREATE exercise in a routine
// ============================================================
router.post('/exercise', verificarToken, async (req: AuthRequest, res: Response) => {
  const { routineId, titulo, media, series, repesXserie, tiempoXserie, descansoXserie } = req.body;
  console.log('🔥 POST /exercise called'); // Add this line
  console.log('Body:', req.body); // Add this line

  const toNum = (v: any) => v !== undefined && v !== null && v !== '' ? Number(v) : 0;

  try {
    const ejercicio = await prisma.exercise.create({
      data: {
        titulo,
        media,
        series: toNum(series),
        repesXserie: toNum(repesXserie),
        tiempoXserie: toNum(tiempoXserie),
        descansoXserie: toNum(descansoXserie),
        routineId: Number(routineId),
      },
    });
    return res.json({ success: true, exercise: ejercicio });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Error al crear ejercicio' });
  }
});

// ============================================================
// GET all routines for a user
// ============================================================
router.get('/routines', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id

    const routines = await prisma.routine.findMany({
      where: { userId: parseInt(id) },
      include: {
        exercises: {
          orderBy: { orden: 'desc' },
        },
      },
    });

    return res.json({ success: true, routines });
  } catch (error) {
    console.error('Error fetching routines:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener rutinas',
    });
  }
});

// ============================================================
// GET exercises for a routine
// ============================================================
router.get('/routine/:routineId/exercises', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const { routineId } = req.params;

    const exercises = await prisma.exercise.findMany({
      where: { routineId: parseInt(routineId) },
      orderBy: { orden: 'asc' },
    });

    return res.json({ success: true, exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener ejercicios',
    });
  }
});



//////////////////// de acá para abajo no se implementó aún, hace falta revisar...  
// ============================================================
// UPDATE exercise
// ============================================================
router.put('/exercise/:exerciseId', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;
    const { titulo, media, info1, info2 } = req.body;

    const exercise = await prisma.exercise.update({
      where: { id: parseInt(exerciseId) },
      data: {
        titulo: titulo?.trim() || undefined,
        media: media?.trim() || undefined,
        info1: info1?.trim() || undefined,
        info2: info2?.trim() || undefined,
      },
    });

    res.json({ success: true, exercise });
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar ejercicio',
    });
  }
});

// ============================================================
// DELETE exercise
// ============================================================
router.delete('/exercise/:exerciseId', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const { exerciseId } = req.params;

    await prisma.exercise.delete({
      where: { id: parseInt(exerciseId) },
    });

    res.json({ success: true, message: 'Ejercicio eliminado' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al eliminar ejercicio',
    });
  }
});

// ============================================================
// DELETE routine
// ============================================================
router.delete('/routine/:routineId', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const { routineId } = req.params;

    await prisma.routine.delete({
      where: { id: parseInt(routineId) },
    });

    res.json({ success: true, message: 'Rutina eliminada' });
  } catch (error) {
    console.error('Error deleting routine:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error al eliminar rutina',
    });
  }
});

export default router;