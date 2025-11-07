import { Router } from "express";
import { signupController } from "../controllers/user.controller";

const router = Router();

router.post('/sign-up', signupController);

export default router;