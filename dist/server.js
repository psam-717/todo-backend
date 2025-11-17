"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
const env_1 = require("./config/env");
// const server = http.createServer(app);
const PORT = env_1.ENV.APP.PORT || 4000;
async function startServer() {
    try {
        await (0, db_config_1.connectDB)();
        app_1.default.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log('Failed to start server', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map