// middleware/multerMiddleware.js
import multer from 'multer';

// Use memory storage for buffers
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB (adjust as needed)
  },
  fileFilter: (req, file, cb) => {
    // Optional: add a filter to only accept images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files are allowed!'));
    }
  }
});

export default upload;
