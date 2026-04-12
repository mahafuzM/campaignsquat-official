const Service = require('../models/Service');

// নিশ্চিত করো এখানে 'exports.getAllServices' লিখা আছে
exports.getAllServices = async (req, res, next) => {
  try {
    const { q } = req.query;
    const query = q ? { name: { $regex: q, $options: 'i' } } : {};
    const services = await Service.find(query);
    res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted!" });
  } catch (error) {
    next(error);
  }
};