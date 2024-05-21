
const db = require('../models')
const provinces = db.provinces
const cities = db.cities
const districts = db.districts
const villages = db.villages

const Op = db.Sequelize.Op
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.listProvince = async (req, res) => {
    try {
        const size = req.query.size || 99;
        const page = req.query.page || 0;
        const offset = size * page;

        const result = await provinces.findAndCountAll({
            where: {
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['name', 'ASC'],
            ],
            exclude: ['deleted'],
            ...req.query.pagination == 'true' && {
                limit: size,
                offset: offset
            }
        })
        return res.status(200).send({
            status: "success",
            items: result,
            total_pages: Math.ceil(result.count / size),
            current_page: page,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.listCity = async (req, res) => {
    try {
        const size = req.query.size || 9999;
        const page = req.query.page || 0;
        const offset = size * page;

        if (!req.query.province_id) {
            return res.status(400).send({
                status: "error",
                error_message: "Tentukan Provinsi Terlebih Dahulu!",
                code: 400
            })
        }

        const result = await cities.findAndCountAll({
            where: {
                province_id: { [Op.eq]: req.query.province_id },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['name', 'ASC'],
            ],
            ...req.query.pagination == 'true' && {
                limit: size,
                offset: offset
            }
        })
        return res.status(200).send({
            status: "success",
            items: result,
            total_pages: Math.ceil(result.count / size),
            current_page: page,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.listDistrict = async (req, res) => {
    try {
        const size = req.query.size || 9999;
        const page = req.query.page || 0;
        const offset = size * page;

        if (!req.query.city_id) {
            return res.status(400).send({
                status: "error",
                error_message: "Tentukan Kota/Kab Terlebih Dahulu!",
                code: 400
            })
        }

        const result = await districts.findAndCountAll({
            where: {
                city_id: { [Op.eq]: req.query.city_id },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['name', 'ASC'],
            ],
            ...req.query.pagination == 'true' && {
                limit: size,
                offset: offset
            }
        })
        return res.status(200).send({
            status: "success",
            items: result,
            total_pages: Math.ceil(result.count / size),
            current_page: page,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.listVillage = async (req, res) => {
    try {
        const size = req.query.size || 9999;
        const page = req.query.page || 0;
        const offset = size * page;

        if (!req.query.district_id) {
            return res.status(400).send({
                status: "error",
                error_message: "Tentukan Kecamatan Terlebih Dahulu!",
                code: 400
            })
        }

        const result = await villages.findAndCountAll({
            where: {
                district_id: { [Op.eq]: req.query.district_id },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['name', 'ASC'],
            ],
            ...req.query.pagination == 'true' && {
                limit: size,
                offset: offset
            }
        })
        return res.status(200).send({
            status: "success",
            items: result,
            total_pages: Math.ceil(result.count / size),
            current_page: page,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};