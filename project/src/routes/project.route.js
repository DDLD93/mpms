const ProjectCtrl = require('../controller/project.controller');
const multer = require('multer');
const uuid = require('uuid').v4;
const { Router } = require("express")

module.exports = (UPLOADS) => {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fPath = UPLOADS;
      cb(null, fPath);
    },
    filename: function (req, file, cb) {
      const arr = file.originalname.split('.');
      const ext = arr[arr.length - 1];
      const fileUrl = `${uuid().replace(/-/g, '')}.${ext}`;
      const filePath = '/uploads/' + fileUrl;
      req.filePath = filePath

      if (!req.filePaths) {
        req.filePaths = [];
      }
      req.filePaths.push(filePath);
      cb(null, fileUrl);
    }
  });

  const upload = multer({ storage });
  let api = new Router();

  api.post("/", upload.fields([{ name: "document" }]), async (req, res) => {
    const body = JSON.parse(req.body.meta)
    body.documents = req.filePaths || []
    console.log("body >>>", body)
    let { ok, data, message } = await ProjectCtrl.addProject(body);
    if (ok) {
      res.status(201).json({ ok, data });
    } else {
      res.status(500).json({ ok, message });
    }
  });
  api.post("/scheduler/callback", async (req, res) => {
    const body = req.body;
    console.log({ body })
    res.end()


  });
  api.get("/", async (req, res) => {
    let { ok, data, message } = await ProjectCtrl.getProjects();
    if (ok) {
      return res.status(200).json({ ok, data });
    } else {
      res.status(500).json({ ok, message });
    }
  });

  api.get("/:id", async (req, res) => {
    let { id } = req.params;
    let { ok, data, message } = await ProjectCtrl.getProject(id);
    if (ok) {
      return res.status(200).json({ ok, data });
    } else {
      res.status(500).json({ ok, message });
    }
  });

  api.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    let { ok, data, message } = await ProjectCtrl.updateProject(id, body)
    if (ok) {
      return res.status(200).json({ ok, data });
    } else {
      res.status(500).json({ ok, message });
    }
  });
  return api;
}
