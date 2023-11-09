const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MilestoneDocumentSchema = new Schema({
  filePath: { type: String },
  description: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now() },
})


const MilestoneSchema = new Schema({
  name: { type: String, required: true, },
  deliverables: { type: String },
  description: { type: String, required: true, },
  weight: { type: Number, required: true, },
  score: { type: Number },
  remark: { type: String, required: true, },
  documents: [{ type: MilestoneDocumentSchema }],
  startDate: { type: Date, required: true, },
  endDate: { type: Date, required: true, },
});

const ProjectSchema = new Schema({
  mda: { type: String, index: true, required: true, },
  name: { type: String, index: true, required: true, },
  objective: { type: String, required: true, },
  description: { type: String, index: true, required: true },
  kpi: [{ type: String, required: true, }],
  weight: { type: Number, default: 0 },
  milestones: [{ type: MilestoneSchema }],
  startDate: { type: Date, required: true, },
  endDate: { type: Date, required: true, },
  documents: [{ type: String },],
  updatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now() },
});
ProjectSchema.index({ name: "text", "description": "text" })
module.exports = mongoose.model("Project", ProjectSchema);


