import { Router } from "express";
import { initDB } from "../db";

const router = Router();

router.post("/insert", async (req, res) => {
    const db = await initDB();
    const { name, quantity } = req.body;

    const result = await db.run("INSERT INTO items (name, quantity) VALUES (?, ?)", name, quantity);

    res.status(201).json({ id: result.lastID, name });
});

router.put("/update", async (req, res) => {
    const db = await initDB();
    const { name, quantity } = req.body;

    await db.run("UPDATE items SET quantity = ? WHERE name = ?", quantity, name);

    res.json({ id: req.params, name });
});

router.delete("/delete", async (req, res) => {

    const db = await initDB();
    await db.run("DELETE FROM items WHERE name = ?", req.body.name);

    res.status(204).send();
});

router.get("/getall", async (req, res) => {
    const db = await initDB();
    const items = await db.all("SELECT * FROM items");
    
    res.json(items);
});

export default router;