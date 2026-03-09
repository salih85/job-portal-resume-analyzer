const router = require("express").Router();
const upload = require("../middlewears/uploadMiddleware");
const { protect } = require("../middlewears/authMiddleware");
const {
  uploadResume,
  getMyResume,
  getResumeById,
} = require("../controllers/resumeController");

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my", protect, getMyResume);
router.get("/:id", protect, getResumeById);

module.exports = router;

