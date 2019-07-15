const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
  const post = req.body;

  try {
    const insPost = await db("posts").insert(post, "id");
    res.status(201).json(insPost[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("posts").where({ id: id });
    if (count > 0) {
      res.status(200).json({ message: `${count} record(s) updated.` });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db("posts")
      .where({ id: id })
      .del();
    res.status(200).json({ message: `${count} record(s) deleted.` });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
