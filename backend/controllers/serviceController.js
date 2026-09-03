const Service = require('../models/Service');

// @desc  Get services (public: active only, sorted)
// @route GET /api/services
const getServices = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { active: true };
    const services = await Service.find(filter).sort({ displayOrder: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single service
// @route GET /api/services/:id
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc  Create service (admin)
// @route POST /api/services
const createService = async (req, res, next) => {
  try {
    const { title, description, icon, displayOrder, active } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const service = await Service.create({
      title,
      description,
      icon,
      displayOrder: displayOrder || 0,
      active: active !== undefined ? active === 'true' || active === true : true,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc  Update service (admin)
// @route PUT /api/services/:id
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    const { title, description, icon, displayOrder, active } = req.body;
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (displayOrder !== undefined) service.displayOrder = displayOrder;
    if (active !== undefined) service.active = active === 'true' || active === true;

    await service.save();
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete service (admin)
// @route DELETE /api/services/:id
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    await service.deleteOne();
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices, getServiceById, createService, updateService, deleteService };
