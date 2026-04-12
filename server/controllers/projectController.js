const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
  try {
    const { q } = req.query;
    const query = q ? { title: { $regex: q, $options: 'i' } } : {};
    const projects = await Project.find(query);
    res.json(projects);
  } catch (error) { next(error); }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted!" });
  } catch (error) { next(error); }
};