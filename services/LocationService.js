import LocationModel from '../models/Location.js'

export default class LocationService {
    static async createLocation(locationData) {
        try {
            console.log(locationData)
            return await LocationModel.create(locationData)
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getAllLocations(page, pageSize) {
        try {
            return await LocationModel.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getLocationById(locationId) {
        try {
            return await LocationModel.findById(locationId);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getLocationsByCategory(category, page, pageSize) {
        try {
            const query = { category };
            return await LocationModel.find(query)
                .skip((page - 1) * pageSize)
                .limit(pageSize);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateLocationById(locationId, updateData) {
        try {
            return await LocationModel.findByIdAndUpdate(locationId, updateData, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateLocationsByCategory(category, updateData) {
        try {
            const query = { category };
            const result = await LocationModel.updateMany(query, updateData);
            return result.nModified;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteLocationById(locationId) {
        try {
            return await LocationModel.findByIdAndDelete(locationId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}