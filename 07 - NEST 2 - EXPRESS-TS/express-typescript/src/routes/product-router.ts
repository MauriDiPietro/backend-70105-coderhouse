import { Router } from "express";
import * as controllers from '../controllers/product-controller';
import { validatePostProduct } from "../middlewares/product-validator";

const router = Router();

router.get('/', controllers.getAll)
router.get('/:id', controllers.getById)
router.post('/', [validatePostProduct], controllers.create)
router.put('/:id', [validatePostProduct], controllers.update)
router.delete('/:id', controllers.remove)

export default router