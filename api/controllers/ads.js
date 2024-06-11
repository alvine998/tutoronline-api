
const db = require('../models')
const ads = db.ads
const users = db.users
const Op = db.Sequelize.Op
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = +req.query.size || 10;
        const page = +req.query.page || 0;
        const offset = size * page;

        const result = await ads.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                partner_code: { [Op.eq]: req.header('x-partner-code') },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.user_id && { user_id: { [Op.eq]: req.query.user_id } },
                ...req.query.brand_id && { brand_id: { [Op.eq]: req.query.brand_id } },
                ...req.query.type_id && { type_id: { [Op.eq]: req.query.type_id } },
                ...req.query.category_id && { category_id: { [Op.eq]: req.query.category_id } },
                ...req.query.subcategory_id && { subcategory_id: { [Op.eq]: req.query.subcategory_id } },
                ...req.query.province_id && { province_id: { [Op.eq]: req.query.province_id } },
                ...req.query.city_id && { city_id: { [Op.eq]: req.query.city_id } },
                ...req.query.district_id && { district_id: { [Op.eq]: req.query.district_id } },
                ...req.query.village_id && { village_id: { [Op.eq]: req.query.village_id } },
                ...req.query.ownership && { ownership: { [Op.eq]: req.query.ownership } },
                ...req.query.year && { year: { [Op.eq]: req.query.year } },
                ...req.query.transmission && { transmission: { [Op.eq]: req.query.transmission } },
                ...req.query.km && { km: { [Op.eq]: req.query.km } },
                ...req.query.color && { color: { [Op.eq]: req.query.color } },
                ...req.query.status && { status: { [Op.eq]: req.query.status } },
                ...req.query.search && {
                    [Op.or]: [
                        { title: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['created_on', 'DESC'],
            ],
            attributes: { exclude: ['deleted'] },
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

exports.create = async (req, res) => {
    try {
        ['title', 'description', 'user_id', 'price', 'brand_id', 'type_id', 'category_id', 'subcategory_id', 'province_id',
            'city_id', 'district_id', 'images'
        ]?.map(value => {
            if (!req.body[value]) {
                return res.status(400).send({
                    status: "error",
                    error_message: "Parameter tidak lengkap " + value,
                    code: 400
                })
            }
        })
        const payload = {
            ...req.body,
            partner_code: req.header('x-partner-code'),
        };
        const result = await ads.create(payload)
        return res.status(200).send({
            status: "success",
            items: result,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};

exports.update = async (req, res) => {
    try {
        const result = await ads.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(400).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            ...req.body,
        }
        const onUpdate = await ads.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", update: onUpdate })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await ads.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        await result.save()
        res.status(200).send({ message: "Berhasil hapus data" })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.updateCalls = async (req, res) => {
    try {
        const result = await ads.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(400).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            calls: result.calls + 1
        }
        const onUpdate = await ads.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil menambah calls", update: onUpdate })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.updateViews = async (req, res) => {
    try {
        const result = await ads.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(400).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            views: result.views + 1
        }
        const onUpdate = await ads.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil menambah calls", update: onUpdate })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}