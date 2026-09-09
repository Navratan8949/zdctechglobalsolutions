const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");
const fs = require("fs");

const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file provided" });
        }

        const uploadedFile = await uploadLocalFile(req.file.path);
        
        if (!uploadedFile) {
            return res.status(500).json({ success: false, message: "Failed to upload file" });
        }

        res.status(200).json({
            success: true,
            data: uploadedFile
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

const deleteFile = async (req, res, next) => {
    try {
        const { public_id } = req.body;
        
        if (!public_id) {
            return res.status(400).json({ success: false, message: "public_id is required" });
        }

        const deleted = await deleteLocalFile(public_id);
        
        if (!deleted) {
            return res.status(404).json({ success: false, message: "File not found or cannot be deleted" });
        }

        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile,
    deleteFile
};
