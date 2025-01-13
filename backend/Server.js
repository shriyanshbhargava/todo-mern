// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create an instance of express
const app = express();

// Middleware
app.use(cors()); // Enable cross-origin requests (CORS)
app.use(bodyParser.json()); // Parse incoming JSON requests

// MongoDB Connection (Replace with your own MongoDB URI)
mongoose
  .connect(
    "mongodb+srv://isthisallitsgonnabe:goQ6GQsjvYd8v7WV@cluster0.v1fxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Define the Document Schema and Model
const documentSchema = new mongoose.Schema(
  {
    name: String,
    docType: String,
    fileUrl: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Store uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

// 1. Create and upload a new document
app.post("/api/documents", upload.single("file"), async (req, res) => {
  try {
    // Extract the name and file URL
    const { name } = req.body;
    const { docType } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Name or file missing" });
    }

    // Create a new document
    const newDocument = new Document({
      name,
      docType,
      fileUrl,
    });

    // Save the document to the database
    const savedDocument = await newDocument.save();

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
});

// 2. Get all documents
app.get("/api/documents", async (req, res) => {
  try {
    const documents = await Document.find();
    console.log("API Response:", documents);
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// 3. Get a specific document by ID
app.get("/api/documents/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Error fetching document" });
  }
});

// 4. Update a document without requiring any field
app.put("/api/documents/:id", async (req, res) => {
  const { name, docType, status } = req.body;

  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update the document fields
    document.name = name || document.name;
    document.docType = docType || document.docType; // Ensure docType is updated
    document.status = status || document.status; // Ensure status is sent if required

    // Save the document
    await document.save();

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// 5. Delete a document by ID
app.delete("/api/documents/:id", async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Error deleting document" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
