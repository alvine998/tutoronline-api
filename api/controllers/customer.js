
const db = require('../models')
const customers = db.customers
const Op = db.Sequelize.Op
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = req.query.size || 10;
        const result = await customers.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                app_id: {[Op.eq]: req.header('x-app-id')},
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { phone: { [Op.like]: `%${req.query.search}%` } },
                        { email: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['created_on', 'DESC'],
            ],
            limit: size
        })
        return res.status(200).send({
            status: "success",
            total_items: result.length,
            items: result,
            code: 200
        })
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error: error })
    }
};

exports.create = async (req, res) => {
    try {
        const payload = {
            ...req.body,
        };
        const result = await customers.create(payload)
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
        const result = await customers.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const payload = {
            ...req.body,
        }
        const onUpdate = await customers.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await customers.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results, update: onUpdate })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await customers.findOne({
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
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}