import Compressor from 'compressorjs';

const optimizeImageFile = (file) => new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      mimeType: 'image/webp',
      maxWidth: 1440,
      success(result) {
        resolve(result);
      },
      error(err) {
        console.log(err.message);
        reject(err);
      },
    });
  });

export default optimizeImageFile;