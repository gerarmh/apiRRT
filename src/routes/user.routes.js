import { Router } from "express"
const router = Router()
import * as usrCtrlr from '../Controllers/user.controller'
import * as authVerify from "../middlewares/authVerify"
import * as singupVerify from '../middlewares/singupVerify'

router.post('/', [authVerify.verifytoken, authVerify.isSuper, singupVerify.RoleChecker], usrCtrlr.createUser);

export default router;