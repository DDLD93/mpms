const ProjectModel = require("../model/project.model");
const http = require('http');
const { schedulerURL, app } = require('../config');

class ProjectController {
  constructor() { }

  async getProjects() {
    try {
      const projects = await ProjectModel.find();
      return { ok: true, data: projects };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async getProject(id) {
    try {
      const project = await ProjectModel.findById(id);
      return { ok: true, data: project };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
  async addProject(data) {
    try {
      const newProject = new ProjectModel(data)
      let milestones = data.milestones
      const project = await newProject.save()
      await addToScheduler(milestones)
      
      return { ok: true, data: project };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async addDocumentToMilestone(projectId, milestoneId, newData) {
    console.log({ projectId, milestoneId, newData })
    try {
      const project = await ProjectModel.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }
      const milestone = project.milestones.id(milestoneId);
      if (!milestone) {
        throw new Error('Milestone not found');
      }
      milestone.documents.push(newData);
      const updatedProject = await project.save();
      return { ok: true, data: updatedProject };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
  async updateProject(id, newdata) {
    try {
      const project = await ProjectModel.findByIdAndUpdate(id, newdata, { new: true, multi: false });
      return { ok: true, data: project };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
  

}

module.exports = new ProjectController();


async function addToScheduler(milestones) {
  let promiseArr = [];
  try {
      milestones.map(milestone => {
         let date = milestone.endDate            

          let meta = {
              projectId: "",
              milestoneId: "",
              description: "milestone expiration",
          }
          let schedulerObj = {
              date: date,
              time: "09:00:00",
              callbackUrl: `${app.domain}/api/v1/project/scheduler/callback`,
          }
          promiseArr.push(makePostRequest({ ...schedulerObj, meta }))
      });
      let result = await Promise.all(promiseArr)
      // console.log({ result })
  } catch (error) {
      console.log(error.message)
      return Promise.reject(promiseArr)
  }
}



function makePostRequest(data) {
  return new Promise((resolve, reject) => {
    // Create the request options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Create the HTTP request
    const req = http.request(schedulerURL, options, (res) => {
      let responseBody = '';

      // Collect the response data
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      // Handle the response
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsedResponse = JSON.parse(responseBody);
            resolve(parsedResponse);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(`Request failed with status code ${res.statusCode}`);
        }
      });
    });

    // Handle errors during the request
    req.on('error', (error) => {
      reject(error);
    });

    // Send the request with the data
    req.write(JSON.stringify(data));
    req.end();
  });
}