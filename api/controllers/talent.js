
const db = require('../models')
const talents = db.talents
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
require('dotenv').config()

// Retrieve and return all notes from the database.
exports.list = async (req, res) => {
    try {
        const size = +req.query.size || 10;
        const page = +req.query.page || 0;
        const offset = size * page;

        const result = await talents.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.age && { age: { [Op.eq]: req.query.age } },
                ...req.query.status && { status: { [Op.eq]: req.query.status } },
                ...req.query.verified == '1' && { verified_at: { [Op.not]: null } },
                ...req.query.verified == '0' && { verified_at: { [Op.is]: null } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { email: { [Op.like]: `%${req.query.search}%` } },
                        { phone: { [Op.like]: `%${req.query.search}%` } },
                        { username: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
            },
            order: [
                ['created_on', 'DESC'],
            ],
            attributes: { exclude: ['deleted', 'password'] },
            ...req.query.pagination == 'true' && {
                limit: size,
                offset: offset
            }
        })
        return res.status(200).send({
            status: "success",
            items: result.rows,
            total_items: result.count,
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
        ['name', 'username', 'email', 'phone', 'address', 'age', 'password']?.map(value => {
            if (!req.body[value]) {
                return res.status(400).send({
                    status: "error",
                    error_message: "Parameter tidak lengkap " + value,
                    code: 400
                })
            }
        })
        const existUser = await talents.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: req.body.email },
                username: { [Op.eq]: req.body.username },
                phone: { [Op.eq]: req.body.phone },
            }
        })
        if (existUser) {
            return res.status(400).send({ status: "error", code: 400, message: "Email / Username Telah Terdaftar!" })
        }
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const payload = {
            ...req.body,
            password: password
        };
        const result = await talents.create(payload)
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
        const result = await talents.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id },
                email: { [Op.eq]: req.body.email }
            }
        })
        if (!result) {
            return res.status(400).send({ status: "error", code: 400, message: "Data tidak ditemukan!" })
        }
        let payload = {}
        if (req.body.password && req.body.password !== "") {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            payload = {
                ...req.body,
                password: password
            }
        } else {
            payload = {
                ...req.body,
                updated_on: new Date()
            }
        }
        const onUpdate = await talents.update(payload, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ status: "success", code: 200, message: "Berhasil ubah data", update: onUpdate })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await talents.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(400).send({ status: "error", code: 400, message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        result.updated_on = new Date()
        await result.save()
        res.status(200).send({ status: "success", code: 200, message: "Berhasil hapus data" })
        return
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Gagal mendapatkan data", error: error })
        return
    }
}

exports.verificationTalent = async (req, res) => {
    try {
        const result = await talents.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id },
                email: { [Op.eq]: req.body.email },
            }
        })
        if (!result) {
            return res.status(400).send({ status: "error", code: 400, message: "Data tidak ditemukan!" })
        }
        const onUpdate = await talents.update({
            verified_at: new Date(),
            updated_on: new Date()
        }, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ status: "success", code: 200, message: "Verifikasi Berhasil", update: onUpdate })
        return
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data", error: error })
    }
}