const UserCtrl = require('../controller/user.controller');
const { Router } = require("express")

module.exports = (express) => {
  let api = new Router();


  api.post("/login", async (req, res) => {
    let { email, password } = req.body
    let { ok, data, message } = await UserCtrl.login(email, password);
    if (ok) {
      res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, data, message });
    }
  });

  api.post("/register", async (req, res) => {
    let body = req.body
    let { ok, data, message } = await UserCtrl.register(body);
    if (ok) {
      res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, data, message });
    }
  });

  return api;
}
