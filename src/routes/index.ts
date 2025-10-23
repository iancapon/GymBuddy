import { Router } from 'express'
import profile from './profile'
import register from './register'
import session from './session'
import workout from './workout'
import programar from './programar_workout'

const router = Router()
router.use("/register", register)
router.use("/profile", profile)
router.use("/session", session)
router.use("/workout", workout)
router.use("/programar_workout", programar)

export default router