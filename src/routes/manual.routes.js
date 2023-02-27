import { Router } from 'express'
import * as Manualctrl from '../Controllers/Manual.controllers'

const router = Router()

router.get('/', Manualctrl.getmanuals)

router.get('/:manualId', Manualctrl.getmanualById)

router.get('/', Manualctrl.getmanualbyOCR)

router.post('/', Manualctrl.createmanual)

router.put('/:manualId', Manualctrl.updatemanualById)

router.delete('/:manualId', Manualctrl.deletemanualById)


export default router;

