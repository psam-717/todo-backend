"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/sign-up', user_controller_1.signupController);
router.post('/login', user_controller_1.loginController);
router.post('/logout', user_controller_1.logoutController);
router.get('/me', auth_middleware_1.authenticate, user_controller_1.getUserController);
exports.default = router;
//# sourceMappingURL=user.routes.js.map