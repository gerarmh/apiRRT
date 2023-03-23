import { Router } from 'express'
import * as Manualctrl from '../Controllers/Manual.controllers'
import * as AuthV from "../middlewares/authVerify"
const router = Router()

router.get('/', Manualctrl.getmanuals);

router.get('/:manualId', Manualctrl.getmanualById);

router.get('/', Manualctrl.getmanualbyOCR);

router.post('/', [AuthV.verifytoken, AuthV.isSuper ] , Manualctrl.createmanual);

router.put('/:manualId', [AuthV.verifytoken, AuthV.isSuper ] , Manualctrl.updatemanualById);

router.delete('/:manualId', [AuthV.verifytoken, AuthV.isSuper ], Manualctrl.deletemanualById);


export default router;

