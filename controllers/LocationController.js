import LocationService from "../services/LocationService.js";
import {createErrorResponse, createSuccessResponse} from "../helpers/responseHandler.js";

export const createLocation = async (req, res, next) => {
    try {
        const location = await LocationService.createLocation(req.body);
        res.json(createSuccessResponse({location}));
    } catch (error) {
        next(error)
    }
}

export const getAllLocations = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.page_size) || 10;
    try {
        const locations = await LocationService.getAllLocations(page, pageSize);
        res.json(createSuccessResponse({locations}));
    } catch (error) {
        next(error)
    }
}

export const getLocationById = async (req, res, next) => {
    const locationId = req.params.location_id;
    try {
        const location = await LocationService.getLocationById(locationId);
        if (!location) {
            res.status(400).json(createErrorResponse(undefined, "Location not found"));
        }
        res.json(createSuccessResponse({location}));
    } catch (error) {
        next(error);
    }
}

export const getLocationsByCategory = async (req, res, next) => {
    const {category, page, page_size} = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(page_size) || 10;
    try {
        const locations = LocationService.getLocationsByCategory(category, pageNumber, pageSize);
        res.json(createSuccessResponse({locations}));
    } catch (error) {
        next(error)
    }
}

export const updateLocationById = async (req, res, next) => {
    const locationId = req.params.location_id;
    const updateData = req.body;
    try {
        const updatedLocation = LocationService.updateLocationById(locationId, updateData);
        if (!updatedLocation) {
            res.status(400).json(createErrorResponse(undefined, "Location not found"));
        }
        res.json(createSuccessResponse({updatedLocation}));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateLocationsByCategory = async (req, res, next) => {
    const {category} = req.query;
    const updateData = req.body;
    try {
        const updatedData = LocationService.updateLocationsByCategory(category, updateData);
        res.json(createSuccessResponse({updatedData}));
    } catch (error) {
        next(error)
    }
}

export const deleteLocationById = async (req, res, next) => {
    const locationId = req.params.location_id;
    try {
        const deletedLocation = LocationService.deleteLocationById(locationId);
        if (!deletedLocation) {
            res.status(400).json(createErrorResponse(undefined, "Location not found"));
        }
        res.json(createSuccessResponse({deletedLocation}));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}