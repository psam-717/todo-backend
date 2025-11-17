"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const toDoSchema = new mongoose_1.Schema({
    task: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    createdAt: { type: Date }
});
exports.default = (0, mongoose_1.model)('ToDo', toDoSchema);
//# sourceMappingURL=todo.model.js.map