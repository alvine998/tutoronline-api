require('dotenv').config()

exports.upload = async (req, res) => {
    try {
        return res.status(200).send({
            status: "success",
            url: (process.env.PATH_URL || 'http://localhost:8080/images/') + req?.file?.filename,
            code: 200
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server mengalami gangguan!", error: error })
        return
    }
};