const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { app } = require("../config/firebase");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const storage = getStorage(app);

const uploadImage = async (req, subfolder) => {
  const metadata = { contentType: 'image/webp' };
  const inputPath = req.file.path;

  const originalFilename = req.file.originalname;
  const outputFileName = originalFilename.replace(/\.[^/.]+$/, ".webp");

  sharp.cache(false);
  const webBuffer = await sharp(inputPath).webp({ quality: 50 }).toBuffer();

  const storageRef = ref(
    storage,
    `${subfolder}/${
      new Date().toISOString().replace(/:/g, "-") + "-" + outputFileName
    }`
  );

  const snapshot = await uploadBytesResumable(storageRef, webBuffer, metadata);

  const imageUrl = await getDownloadURL(snapshot.ref);
  await fs.unlink(inputPath);

  return imageUrl;
};

const deleteImage = async (imageUrl, cb) => {
  const desertRef = ref(storage, imageUrl);
  deleteObject(desertRef)
    .then(() => {
      cb();
    })
    .catch((error) => {
      throw Error(error);
    });
};

module.exports = { uploadImage, deleteImage };
