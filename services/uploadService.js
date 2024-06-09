import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Create a new instance of the UploadService

    // Set up the storage for multer
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
class UploadService {
  constructor() {

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const folderName = req.query.folderName;
        const uploadPath = path.join(__dirname, `../uploads/${folderName}`);
        // Check if the directory exists, and create it if not
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        // Generate a unique filename using uuid
        const uniqueFileName = `${uuidv4()}-${file.originalname.trim()}`;
        cb(null, uniqueFileName);
      },
    });

    // Initialize multer with the storage configuration
    this.upload = multer({ storage: this.storage });
  }

  // Upload a single file
  uploadSingle(req, res, next) {
    const folderName = req.query.folderName;

    // 'file' should be the name of the field in the form
    this.upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const filePath =  `/uploads/${folderName}/${req.file.filename}`;
      res.json({ filePath });
    });
  }

  // Upload multiple files
  uploadMultiple(req, res, next) {
    const folderName = req.query.folderName;

    // 'files' should be the name of the field in the form
    this.upload.array('files')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const filePaths = req.files.map((file) => {
        return `/uploads/${folderName}/${file.filename}`;
      });

      res.json({ filePaths });
    });
  }
}

export default UploadService;
