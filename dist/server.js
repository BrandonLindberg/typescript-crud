import express from "express";
import path from "path";
import itemsRouter from "./routes/items";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline';");
    next();
});
app.use("/items", itemsRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
