const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadFile = async (stream) => {
    return await new Promise((resolve, reject) => {
        stream.pipe(
            cloudinary.v2.uploader.upload_stream((err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        )
    })
}

module.exports = { uploadFile }