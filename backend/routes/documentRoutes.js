// server/routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getDocuments,
  createDocument,
  updateDocumentDetails,
  deleteDocument,
} = require("../controller/documentController");

// Get all documents
router.get("/", getDocuments);

// Create a new document
router.post("/", createDocument);

// Update document status
router.put("/:id", updateDocumentDetails);

// Delete a document
router.delete("/:id", deleteDocument);

module.exports = router;
