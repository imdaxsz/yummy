import Compressor from 'compressorjs';

const optimizeImageFile = (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      convertSize: 1000000,
      mimeType: 'image/webp',
      maxWidth: 1920,
      success(result) {
        resolve(result);
      },
      error(err) {
        console.log(err.message);
        reject(err);
      },
    });
  })
};

export default optimizeImageFile;