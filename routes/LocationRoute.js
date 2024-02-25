import {Router} from 'express';
import {
    createLocation,
    getAllLocations,
    getLocationById,
    getLocationsByCategory,
    updateLocationById,
    updateLocationsByCategory,
    deleteLocationById
} from "../controllers/LocationController.js";
import {authMiddleware} from '../middlewares/AuthMiddleware.js'

const router = Router()

router.post('/', createLocation)
router.get('/', getAllLocations)
router.get('/:location_id', getLocationById);
router.get('/', getLocationsByCategory);
router.patch('/:location_id', authMiddleware, updateLocationById);
router.patch('/', authMiddleware, updateLocationsByCategory);
router.delete('/:location_id', authMiddleware, deleteLocationById);

export default router