// middleware/multerMiddleware.js
import multer from 'multer';
import { Request } from 'express';

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


// Define allowed MIME types
const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
];

export const uploadAllFormat = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Increased limit for documents (e.g., 10MB)
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    
    // Check if the uploaded file's mimetype is in our allowed list
    if (allowedMimeTypes.includes(file.mimetype)) {
      // Accept the file
      cb(null, true);
    } else {
      // Reject the file and provide a descriptive error
      const error = new Error('Only image, PDF, and document files are allowed!');
      // Pass the error back to multer (see previous solution for TS strictness fix)
      cb(error); 
    }
  }
});
