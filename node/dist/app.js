"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./main"));
require('dotenv').config();
var multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT;
app.use(body_parser_1.default.json({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(upload.single('file'));
app.use(express_1.default.static('uploads'));
app.use("/", main_1.default);
(0, db_1.default)();
app.listen(port, () => { return console.log(`Express is listening at http://localhost:${port}`); });
//# sourceMappingURL=app.js.map