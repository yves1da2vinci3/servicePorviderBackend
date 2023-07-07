import multer from 'multer'
import fs from 'fs'

// Define the destination directory for file uploads
const uploadDirectory = './uploads'

// Set up multer for single file upload
const uploadSingle = (folder) => {
  // Check if directory exists and create it if it does not
  if (!fs.existsSync(folder)) {
    try {
      fs.mkdirSync(folder, { recursive: true })
    } catch (error) {
      console.error('Error creating directory:', error)
    }
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg' )
    }
  })

  const upload = multer({ storage })

  return upload.single('image')
}

// Set up multer for multiple file upload
const uploadMultiple = (folder) => {
  // Check if directory exists and create it if it does not
  if (!fs.existsSync(folder)) {
    try {
      fs.mkdirSync(folder, { recursive: true })
    } catch (error) {
      console.error('Error creating directory:', error)
    }
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
  })

  const upload = multer({ storage })

  return upload.array('images')
}

// Array of allowed document types
const documentTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const uploadDocument = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder
      cb(null, 'uploads/documents');
    },
    filename: function (req, file, cb) {
      // Get the file name extension
      const extension = file.originalname.split('.').pop();

     

      // Generate a unique file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

      // Assign the file name with the document type extension
      const fileName = file.fieldname + '-' + uniqueSuffix + '.' + extension;

      // Pass the filename and document type to the callback function
      cb(null, fileName);
    }
  }),
  fileFilter: function (req, file, cb) {
    // Check the file type and allow only specified document types
    if (documentTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
});

export { uploadSingle, uploadMultiple,uploadDocument }
