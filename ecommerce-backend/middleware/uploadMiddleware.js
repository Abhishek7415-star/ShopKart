const multer = require("multer");

// Store image temporarily
const storage = multer.diskStorage({});

const upload = multer({
  storage,
});

module.exports = upload;