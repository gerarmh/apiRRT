import { Router } from 'express'
import * as Manualctrl from "../Controllers/Manual.controllers"
import * as AuthV from "../middlewares/authVerify"
import multer from 'multer';
import * as MVerify from '../middlewares/manualV';
const pdfController = require('../Controllers/Manual.controllers');
const uploads = multer({
    dest: './uploads',
    limits: {
      fileSize: { fileSize: 1024 * 1024 * 10 }  // 10 megabytes
    }
  });
const router = Router()

router.get('/', Manualctrl.getmanuals);

router.get('/:manualId', Manualctrl.getmanualById);

router.get('/', Manualctrl.getmanualbyOCR);

// define un endpoint para guardar los archivos PDF
router.post('/', [AuthV.verifytoken, AuthV.isBoth],  uploads.single('archivo'), MVerify.Mduplicity, pdfController.uploadPDF);

module.exports = router;

//router.post('/', [AuthV.verifytoken, AuthV.isSuper, manualV.Mduplicity ] , Manualctrl.createmanual);

router.put('/:manualId', [AuthV.verifytoken, AuthV.isSuper ] , Manualctrl.updatemanualById);

router.delete('/:manualId', [AuthV.verifytoken, AuthV.isSuper ], Manualctrl.deletemanualById);

export default router;

