const UserCtrl = require('../controller/user.controller');
const authorize = require('../middleware/token.middleware');



module.exports = (express) => {
  api = express.Router();


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

  api.get("/",authorize([""]), async (req, res) => {
    let { ok, data, message } = await UserCtrl.getUsers();
    if (ok) {
       res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, message });
    }
  });

  api.get("/:id",authorize([""]), async (req, res) => {
    let { id } = req.params;
    let { ok, data, message } = await UserCtrl.getUser(id);
    if (ok) {
       res.status(200).json({ ok, data, message });
    } else {
      res.status(500).json({ ok, message });
    }
  });



  api.patch("/:id",authorize([""]), async (req, res) => {
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

  // Deleting One
  // api.delete("/:id", async (req, res) => {
  //   let { id } = req.params;
  //   let {} = await UserCtrl.(id)
  //   if (status.ok) {
  //     res.status(200).json(status);
  //   } else {
  //     res.status(500).json(status);
  //   }
  // });

  return api;
}
