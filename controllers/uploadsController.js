const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const BadRequest = require('../errors/bad-request');
const { NO_IMAGE, NON_IMAGE_FILE, SIZE_EXCEEDED } = require('../errors/user-messages');

const uploadProductImage = async (req, res) => {
    if (!req.files || !req.files.productImage) {
        throw new BadRequest(NO_IMAGE);
    }
    const productImage = req.files.productImage;
    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequest(NON_IMAGE_FILE);
    }
    if (productImage.size > Number(process.env.MAX_FILE_SIZE)) {
        throw new BadRequest(SIZE_EXCEEDED);
    }
    const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
        use_filename: true,
        folder: 'file-uploader'
    });
    fs.rmSync(productImage.tempFilePath);
    res.status(StatusCodes.OK).json({ image: { path: result.secure_url } });
};

module.exports = {
    uploadProductImage
};