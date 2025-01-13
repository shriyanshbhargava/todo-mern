// server/controllers/documentController.js
const Document = require("../models/documentModel");

// Get all documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Create a new document
const createDocument = async (req, res) => {
  const { name, docType, fileUrl } = req.body;

  const newDocument = new Document({
    name,
    docType,
    fileUrl,
  });

  try {
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Update document details (name and/or docType)
const updateDocumentDetails = async (req, res) => {
  const { name, docType, status } = req.body;

  try {
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(204).send({ message: "No content to update" });
    }

    // Prepare update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (docType) updateFields.docType = docType;
    if (status) updateFields.status = status;

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).send({ message: "Document not found" });
    }

    res.json(updatedDocument);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

// Delete a document
const deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).send({ message: "Document not found" });
    }
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  getDocuments,
  createDocument,
  updateDocumentDetails,
  deleteDocument,
};
