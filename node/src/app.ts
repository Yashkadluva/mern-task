import express from 'express';
import bodyParser from 'body-parser';
import connection from './config/db';
import cors from "cors";
import router from './main';
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

const app = express();

app.use(cors());
const port = process.env.PORT;

app.use(bodyParser.json({ extended: true } as any));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('file'));
app.use(express.static('uploads'));
app.use("/", router);
connection();

app.listen(port, () => { return console.log(`Express is listening at http://localhost:${port}`); });