
const db = require('../models')
const admins = db.admins
const tutors = db.tutors
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

        const result = await admins.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.id && { id: { [Op.eq]: req.query.id } },
                ...req.query.role && { role: { [Op.in]: req.query.role.split(",") } },
                ...req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { email: { [Op.like]: `%${req.query.search}%` } }
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
        ['name', 'username', 'email', 'password', 'role']?.map(value => {
            if (!req.body[value]) {
                return res.status(400).send({
                    status: "error",
                    error_message: "Parameter tidak lengkap " + value,
                    code: 400
                })
            }
        })
        const existUser = await admins.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: req.body.email },
                username: { [Op.eq]: req.body.username }
            }
        })
        if (existUser) {
            return res.status(400).send({ message: "Email / Username Telah Terdaftar!" })
        }
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const payload = {
            ...req.body,
            password: password
        };
        const result = await admins.create(payload)
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
        const result = await admins.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id },
                email: { [Op.eq]: req.body.email }
            }
        })
        if (!result) {
            return res.status(400).send({ message: "Data tidak ditemukan!" })
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
        const onUpdate = await admins.update(payload, {
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
        const result = await admins.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        result.updated_on = new Date()
        await result.save()
        res.status(200).send({ message: "Berhasil hapus data" })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: "Masukkan Username dan Password!" })
        }
        let result = null
        if (role == "admin") {
            result = await admins.findOne({
                where: {
                    deleted: { [Op.eq]: 0 },
                    status: { [Op.eq]: 1 },
                    username: { [Op.eq]: req.body.username }
                },
            })
        }
        else if (role == "tutor"){
            result = await tutors.findOne({
                where: {
                    deleted: { [Op.eq]: 0 },
                    status: { [Op.eq]: 1 },
                    username: { [Op.eq]: req.body.username }
                },
            })
        } else {
            result = await talents.findOne({
                where: {
                    deleted: { [Op.eq]: 0 },
                    status: { [Op.eq]: 1 },
                    username: { [Op.eq]: req.body.username }
                },
            })
        }

        if (!result) {
            return res.status(404).send({ message: "Akun Belum Terdaftar!" })
        }
        const isCompare = await bcrypt.compare(password, result.password)
        if (!isCompare) {
            return res.status(404).send({ message: "Password Salah!" })
        }
        let result2 = null
        if(role == "admin"){
            result2 = await admins.findOne({
                where: {
                    deleted: { [Op.eq]: 0 },
                    status: { [Op.eq]: 1 },
                    username: { [Op.eq]: req.body.username }
                },
                attributes: { exclude: ['deleted', 'password'] },
            })
        } else if (role == "tutor"){
            result2 = await tutors.findOne({
                where: {
                    deleted: { [Op.eq]: 0 },
                    status: { [Op.eq]: 1 },
                    username: { [Op.eq]: req.body.username }
                },
                attributes: { exclude: ['deleted', 'password'] },
            })
        } else {
            result2 = await talents.findOne({
                where: {
                    deleted: { [Op.eq]: 0 },
                    status: { [Op.eq]: 1 },
                    username: { [Op.eq]: req.body.username }
                },
                attributes: { exclude: ['deleted', 'password'] },
            })
        }
        
        return res.status(200).send({ message: "Berhasil Login", user: result2 })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}