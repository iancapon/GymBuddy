// programar workout
// agregar los workouts al calendario después...

import { Router } from 'express';
import { prisma } from "../prisma";
import { verificarToken, AuthRequest } from '../verificar';
import { Request, Response } from 'express';

const router = Router();

const DAYS_OF_WEEK = [
  { name: 'Lunes', index: 1 },
  { name: 'Martes', index: 2 },
  { name: 'Miércoles', index: 3 },
  { name: 'Jueves', index: 4 },
  { name: 'Viernes', index: 5 },
  { name: 'Sábado', index: 6 },
  { name: 'Domingo', index: 0 },
];

// Post programar una rutina para un dia en especifico
router.post('/schedule', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const { dayIndex, routineId } = req.body
    const id = req.user.id

    // busco si hay una rutina ese dia
    const scheduledThatDay = await prisma.dayAssignment.findFirst({
      where: {
        userId: parseInt(id),
        dayIndex: dayIndex
      },
    });

    if (scheduledThatDay) {
      // Le hago un update a ese dia
      const dayAssignment = await prisma.dayAssignment.update({
        where: {
          id: scheduledThatDay.id
        },
        data: {
          Routine: { connect: { id: routineId } }
        }
      })
      return res.status(201).json({
        success: true,
        message: 'Rutina reprogramada exitosamente',
        data: dayAssignment,
      });
    }

    else {
      // Creo una rutina programada para un usuario
      const dayAssignment = await prisma.dayAssignment.create({
        data: {
          dayIndex: dayIndex,
          Routine: { connect: { id: routineId } },
          User: { connect: { id: id } },
        }
      })
      return res.status(201).json({
        success: true,
        message: 'Rutina programada exitosamente',
        data: dayAssignment,
      });
    }

  }
  catch (error) {
    console.error('Error scheduling routine:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al programar la rutina',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
})


// Post eliminar una rutina para un dia especifico
router.post('/unschedule', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const { dayIndex } = req.body
    const id = req.user.id

    // busco si hay una rutina ese dia
    const scheduledThatDay = await prisma.dayAssignment.findFirst({
      where: {
        userId: parseInt(id),
        dayIndex: dayIndex
      },
    });

    if (scheduledThatDay) {
      // Borro la rutina
      const dayAssignment = await prisma.dayAssignment.delete({
        where: {
          id: scheduledThatDay.id
        }
      })
      return res.status(201).json({
        success: true,
        message: 'Rutina eliminada exitosamente',
        data: dayAssignment,
      });
    }
    else {
      return res.status(201).json({
        success: true,
        message: 'No había rutina ese dia - no se pudo eliminar',
      });
    }
  }
  catch (error) {
    console.error('Error scheduling routine:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la rutina',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
})


// GET para la rutina programada hoy
router.get('/todayschedule', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id
    const today = (new Date()).getDay()

    const assigned = await prisma.dayAssignment.findMany({
      where: { userId: Number(id), dayIndex: today },
      include: {
        Routine: true
      }
    });

    if (!assigned) {
      return res.status(404).json({ success: false, message: "Rutinas asignadas no encontradas" });
    }

    console.log(assigned)
    console.log(req.query)
    return res.json({ success: true, assigned });


  } catch (error) {
    console.error('Error fetching scheduled routines:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las rutinas programadas',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET para todas las rutinas programadas de un usuario
router.get('/findschedule', verificarToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.user.id

    const assigned = await prisma.dayAssignment.findMany({
      where: { userId: Number(id) },
      include: {
        Routine: true
      }
    });

    if (!assigned) {
      return res.status(404).json({ success: false, message: "Rutinas asignadas no encontradas" });
    }

    console.log(assigned)
    console.log(req.query)
    return res.json({ success: true, assigned });

  } catch (error) {
    console.error('Error fetching scheduled routines:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las rutinas programadas',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});


export default router;