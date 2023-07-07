import fs from 'fs'
const deleteFile = (filePath) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.log('Error deleting file:', error);
      } else {
        console.log('File deleted successfully');
      }
    });
  };

  export default deleteFile