import {Router} from 'express'

const router = Router()

import * as authc from '../Controllers/auth.controllers'


router.post ('/singup', authc.singup)
router.post ('/singin', authc.singin)

export default router;