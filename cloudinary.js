const cloudinary = require('cloudinary').v2
const  streamifier = require("streamifier");

cloudinary.config({ 
    cloud_name: "duz3rlxvk", 
    api_key: "788937363886592", 
    api_secret: "GOmZNoIZTF4448RSYE8jrdSA1dQ",
    secure: true
});

const uploadFromBuffer = (buffer,path) => {
    return new Promise((resolve, reject) => {
      let upload_stream = cloudinary.uploader.upload_stream(
       {folder:path},
       (error, result) => {
         if (result) {
           resolve(result);
         } else {
           reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(upload_stream);
    });
 
};

module.exports = uploadFromBuffer;