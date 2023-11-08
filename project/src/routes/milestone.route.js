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

  api.put("/", upload.single("document"), async (req, res) => {
    let { projectId, milestoneId, description } = req.body
    let filePath = req.filePath
    let { ok, data, message } = await ProjectCtrl.addDocumentToMilestone(projectId, milestoneId, { filePath, description });
    if (ok) {
      return res.status(200).json({ ok, data });
    } else {
      res.status(500).json({ ok, message });
    }
  });


  return api;
}
