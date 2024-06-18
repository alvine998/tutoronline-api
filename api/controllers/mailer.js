const nodemailer = require('nodemailer');
const db = require('../models')
const users = db.users
const Op = db.Sequelize.Op
require('dotenv').config();

exports.sendEmail = async (req, res) => {
    try {
        ['text', 'subject', 'from', 'to']?.map(value => {
            if (!req.body[value]) {
                return res.status(400).send({
                    status: "error",
                    error_message: "Parameter tidak lengkap " + value,
                    code: 400
                })
            }
        })

        const existUser = await users.findOne({
            where: {
                email: { [Op.eq]: req.body.to },
                deleted: { [Op.eq]: 0 }
            }
        })

        if (!existUser) {
            return res.status(400).send({
                status: "not found",
                items: "Email belum terdaftar",
                code: 400
            })
        }

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const payload = {
            ...req.body,
        };
        transport.sendMail(payload, function (error, info) {
            if (error) throw Error(error);
            console.log('email send successfully');
            console.log(info);
        })
        return res.status(200).send({
            status: "success",
            items: "Email sent",
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};