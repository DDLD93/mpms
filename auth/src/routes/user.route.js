const UserCtrl = require('../controller/user.controller');
const authorize = require('../middleware/token.middleware');
const { Router } = require("express")


module.exports = () => {
  let api = new Router();

  api.get("/", async (req, res) => {
    let { ok, data, message } = await UserCtrl.getUsers();
    if (ok) {
      res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, message });
    }
  });

  api.get("/:id", authorize([""]), async (req, res) => {
    let { id } = req.params;
    let { ok, data, message } = await UserCtrl.getUser(id);
    if (ok) {
      res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, message });
    }
  });



  api.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now()
    let { ok, data, message } = await UserCtrl.updateUser(id, body)
    if (ok) {
      res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, message });
    }
  });

  return api;
}
