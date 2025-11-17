"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.errorMessage || 'Internal server error';
    res.status(statusCode).json({ error: errorMessage });
}
//# sourceMappingURL=error.middleware.js.map