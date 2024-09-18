const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService, toggleServiceAvailability } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getServices);
router.post('/', protect, authorize('owner'), createService);
router.put('/:id', protect, authorize('owner'), updateService);
router.delete('/:id', protect, authorize('owner'), deleteService);
router.patch('/:id/availability', protect, authorize('owner'), toggleServiceAvailability);

module.exports = router;