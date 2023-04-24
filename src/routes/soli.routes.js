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
router.post('/', [AuthV.verifytoken],uploads.single('archivo'),solicontrlr.uploadsoli);
module.exports = router;
router.put('/:soliId', [AuthV.verifytoken, AuthV.isBoth ], solicontrlr.revision);
export default router;