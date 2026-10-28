const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Configuration for local upload directory
const UPLOAD_DIR = path.join(__dirname, "..", "..", "public", "uploads");

// Ensure the directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Moves a file from a temporary location to the public/uploads directory.
 * @param {string} localFilePath - Path to the temporary file.
 * @returns {Promise<Object|null>} - Returns an object with { public_id, url } or null if failed.
 */
const uploadLocalFile = async (localFilePath) => {
  try {
    if (!localFilePath || !(await fs.existsSync(localFilePath))) {
      throw new Error("File not found at the specified path");
    }

    // Generate a unique filename using timestamp and a random string
    const ext = path.extname(localFilePath);
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const targetPath = path.join(UPLOAD_DIR, uniqueFilename);

    // Move the file safely
    try {
      fs.copyFileSync(localFilePath, targetPath);
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkErr) {
        // ignore unlink error
      }
    } catch (copyErr) {
      fs.renameSync(localFilePath, targetPath);
    }

    // Define the public URL (backend serves the /public folder)
    let baseUrl =
      process.env.API_URL || `http://localhost:${process.env.PORT || 8002}`;
    if (baseUrl.includes("localhost:8000")) {
      baseUrl = baseUrl.replace("localhost:8000", `localhost:${process.env.PORT || 8002}`);
    }
    const fileUrl = `${baseUrl}/public/uploads/${uniqueFilename}`;

    console.log("File uploaded successfully to local folder", fileUrl);

    return {
      public_id: uniqueFilename, // Storing filename as public_id
      url: fileUrl,
      secure_url: fileUrl,
    };
  } catch (error) {
    console.error("Error uploading local file:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

/**
 * Deletes a file from the public/uploads directory.
 * @param {string} public_id - The filename to delete.
 * @returns {Promise<boolean>}
 */
const deleteLocalFile = async (public_id) => {
  try {
    if (!public_id) return false;

    // If public_id is actually a URL (from old cloudinary data), we skip deleting or extract the ID
    if (public_id.includes("/")) {
      console.warn(
        "Attempted to delete a file with a full URL or path as public_id. Skipping local delete.",
        public_id,
      );
      return false;
    }

    const filePath = path.join(UPLOAD_DIR, public_id);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting local file:", error);
    return false;
  }
};

module.exports = { uploadLocalFile, deleteLocalFile };
