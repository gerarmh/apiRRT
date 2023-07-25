import { Router } from "express"
import * as solicontrlr from "../Controllers/soli.controller"
import * as AuthV from "../middlewares/authVerify"
import multer from 'multer';
const uploads = multer({
    dest: './uploads',
    limits: {
      fileSize: { fileSize: 1024 * 1024 * 10 }  // 10 megabytes
    }
  });

const router = Router()
router.get('/', solicontrlr.getsoli);
router.get('/:soliId', solicontrlr.getsolibyID);
router.post('/', [AuthV.verifytoken],uploads.single('archivo'),solicontrlr.uploadsoli);
router.put('/:soliId', [AuthV.verifytoken, AuthV.isBoth ], solicontrlr.revision);
router.put('/:soliId/:userId', [AuthV.verifytoken, AuthV.isSuper ],uploads.array('archivo'), solicontrlr.cambios);
router.put('/:soliId/:soliFolio/:soliApro', [AuthV.verifytoken], solicontrlr.aprobacions);
router.put('/:soliId/:soliFolio/:soliSuper/:userId', [AuthV.verifytoken, AuthV.isSuper], solicontrlr.concluido);
router.put('/:soliId/:soliFolio/:soliRol/:Username/:UserId', [AuthV.verifytoken, AuthV.isBoth], solicontrlr.rechazar);
router.put('/:soliId/:soliFolio/:soliRol/:Username/:UserId/:Area', [AuthV.verifytoken], solicontrlr.comentarios);
router.put('/:soliId/:soliFolio/:soliRol/:Username/:UserId/:Area/:Number', [AuthV.verifytoken, AuthV.isSuper], solicontrlr.actualizar);

module.exports = router;
export default router;