// programar workout
// agregar los workouts al calendario después...

import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

// POST programar una rutina para un dia en especifico
router.post('/schedule', async (req, res) => {
  try {
    const { userId, routineId, fecha, cumplida } = req.body;

    console.log('Schedule request:', { userId, routineId, fecha, cumplida });

    // valido si la request tiene problemitas
    if (!userId || !routineId || !fecha) {
      return res.status(400).json({
        success: false,
        message: 'userId, routineId y fecha son requeridos',
      });
    }

    // Creo una rutina programada para un usuario
    const scheduledRoutine = await prisma.routineAt.create({
      data: {
        userId: parseInt(userId),
        routineId: parseInt(routineId),
        fecha: new Date(fecha),
        cumplida: cumplida ?? false,
        orden: 0,
      },
      include: {
        rutina: {
          include: {
            exercises: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Rutina programada exitosamente',
      data: scheduledRoutine,
    });
  } catch (error) {
    console.error('Error scheduling routine:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al programar la rutina',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// (usar mas adelante, no implementado)
// GET para todas las rutinas de un usuario
router.get('/schedule/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const scheduledRoutines = await prisma.routineAt.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        rutina: {
          include: {
            exercises: true,
          },
        },
      },
      orderBy: {
        fecha: 'asc',
      },
    });

    return res.status(200).json({
      success: true,
      schedules: scheduledRoutines,
    });
  } catch (error) {
    console.error('Error fetching scheduled routines:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las rutinas programadas',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DELETE --> borro una rutina programada
router.delete('/schedule/:scheduleId', async (req, res) => {
  try {
    const { scheduleId } = req.params;

    await prisma.routineAt.delete({
      where: {
        id: parseInt(scheduleId),
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Rutina programada eliminada',
    });
  } catch (error) {
    console.error('Error deleting scheduled routine:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la rutina programada',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// (usar mas adelante, no implementado)
// PATCH --> marco una rutina cuando es finalizada 
router.patch('/schedule/:scheduleId/complete', async (req, res) => {
  try {
    const { scheduleId } = req.params;

    const updatedSchedule = await prisma.routineAt.update({
      where: {
        id: parseInt(scheduleId),
      },
      data: {
        cumplida: true,
      },
      include: {
        rutina: {
          include: {
            exercises: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Rutina marcada como completada',
      data: updatedSchedule,
    });
  } catch (error) {
    console.error('Error completing routine:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al marcar la rutina como completada',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;