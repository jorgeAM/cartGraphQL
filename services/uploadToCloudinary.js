const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadFile = (filename, opts = null) => {
    cloudinary.v2.uploader.upload(filename, (err, res) => console.log(res, err))

}

module.exports = { uploadFile }