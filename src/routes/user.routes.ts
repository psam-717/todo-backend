import { Router } from "express";
import { getUserController, loginController, logoutController, signupController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post('/sign-up', signupController);
router.post('/login', loginController);
router.post('/logout', logoutController)
router.get('/me', authenticate , getUserController);

export default router;