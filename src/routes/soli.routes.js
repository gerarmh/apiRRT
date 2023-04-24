import { Router } from "express"
import * as solicontrlr from "../Controllers/soli.controller"
import * as AuthV from "../middlewares/authVerify"
const router = Router()
router.get('/', solicontrlr.getsoli);
router.post('/', [AuthV.verifytoken, AuthV.isSuper] ,solicontrlr.createsoli);
router.put('/:soliId', [AuthV.verifytoken, AuthV.isBoth ], solicontrlr.revision);
export default router;