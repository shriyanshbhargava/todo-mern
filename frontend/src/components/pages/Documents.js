import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, message, Tag, Modal, Form, Input, Button, Select } from "antd";
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // For edit modal
  const [form] = Form.useForm();
  const [editForm] = Form.useForm(); // For edit form
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentDocument, setCurrentDocument] = useState({
    name: "",
    docType: "",
    status: "",
  });

  // Predefined document types
  const documentTypes = [
    "Government Document",
    "Resume",
    "Voter ID",
    "Aadhar Card",
    "Pan Card",
    "Other",
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios
      .get("http://localhost:5000/api/documents")
      .then((response) => {
        console.log("API Response Data:", response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        message.error("Error fetching documents");
      });
  };

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
    form.resetFields();
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = (values) => {
    if (!selectedFile) {
      message.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", values.name);
    formData.append("docType", values.type);

    axios
      .post("http://localhost:5000/api/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setDocuments([...documents, response.data]);
        message.success("Document uploaded successfully");
        setIsUploadModalVisible(false);
        form.resetFields();
        setSelectedFile(null);
      })
      .catch((err) => {
        message.error(
          "Error uploading document: " +
            (err.response ? err.response.data.message : err.message)
        );
      });
  };

  const handleOpenDocument = (document) => {
    window.open(`http://localhost:5000${document.fileUrl}`, "_blank");
  };

  const handleDeleteDocument = (document) => {
    Modal.confirm({
      title: "Are you sure you want to delete this document?",
      content: "This action cannot be undone",
      onOk() {
        axios
          .delete(`http://localhost:5000/api/documents/${document._id}`)
          .then(() => {
            const filteredDocuments = documents.filter(
              (doc) => doc._id !== document._id
            );
            setDocuments(filteredDocuments);
            message.success("Document deleted successfully");
          })
          .catch((err) => {
            message.error(
              "Error deleting document: " +
                (err.response ? err.response.data.message : err.message)
            );
          });
      },
    });
  };

  const handleDocumentUpdate = (id, name, docType, status) => {
    axios
      .put(`http://localhost:5000/api/documents/${id}`, {
        name,
        docType,
        status, // send the status as part of the update
      })
      .then(() => {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc._id === id ? { ...doc, name, docType, status } : doc
          )
        );
        message.success(`Document updated !"`);
      })
      .catch((error) => message.error("Error updating document"));
  };

  const handleEditSubmit = (values) => {
    const { name, type, status } = values;
    handleDocumentUpdate(currentDocument._id, name, type, status);
    setIsEditModalVisible(false); // Close the edit modal after the update
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      className: "text-gray-800 font-medium",
    },
    {
      title: "TYPE",
      dataIndex: "docType",
      key: "docType",
      className: "text-gray-800",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Tag
          color={status === "Verified" ? "green" : "gold"}
          className={
            status === "Verified"
              ? "text-green-800 border-green-300 bg-green-100 cursor-pointer"
              : "text-yellow-800 border-yellow-300 bg-yellow-100 cursor-pointer"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "DATE MODIFIED",
      key: "dateModified",
      render: (_, record) => (
        <div>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(record.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {new Date(record.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {new Date(record.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {new Date(record.updatedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ),
      className: "text-gray-800",
    },

    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-4">
          <FileTextOutlined
            className="text-blue-600 text-lg cursor-pointer hover:text-blue-800"
            onClick={() => handleOpenDocument(record)}
          />
          <EditOutlined
            className="text-green-600 text-lg cursor-pointer hover:text-green-800"
            onClick={() => {
              setCurrentDocument(record);
              setIsEditModalVisible(true); // Open the edit modal
            }}
          />
          <DeleteOutlined
            className="text-red-600 text-lg cursor-pointer hover:text-red-800"
            onClick={() => handleDeleteDocument(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
      >
        <ArrowLeftOutlined className="mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Documents</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <Button
          type="primary"
          onClick={showUploadModal}
          className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
        >
          Upload New Document
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={documents}
        rowKey="_id"
        pagination={false}
        className="bg-white rounded-lg shadow-sm"
      />

      {/* Upload Document Modal */}
      <Modal
        title="Upload Document"
        visible={isUploadModalVisible}
        onCancel={handleUploadCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleUpload} layout="vertical">
          <Form.Item
            name="name"
            label="Document Name"
            rules={[
              { required: true, message: "Please input the document name!" },
            ]}
          >
            <Input placeholder="Enter document name" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Document Type"
            rules={[
              { required: true, message: "Please select the document type!" },
            ]}
          >
            <Select placeholder="Select document type">
              {documentTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="file"
            label="Upload File"
            rules={[{ required: true, message: "Please upload a document!" }]}
          >
            <div className="flex items-center bg-white text-black">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full bg-white text-black"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 text-white font-semibold"
            >
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Document Modal */}
      <Modal
        title="Edit Document"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={editForm}
          onFinish={handleEditSubmit}
          layout="vertical"
          initialValues={{
            name: currentDocument.name,
            type: currentDocument.docType,
            status: currentDocument.status, // Display status
          }}
        >
          <Form.Item
            name="name"
            label="Document Name"
            rules={[
              { required: true, message: "Please input the document name!" },
            ]}
          >
            <Input placeholder="Enter document name" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Document Type"
            rules={[
              { required: true, message: "Please select the document type!" },
            ]}
          >
            <Select placeholder="Select document type">
              {documentTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Display status but do not allow editing */}
          <Form.Item name="status" label="Document Status">
            <Input value={currentDocument.status} disabled />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Documents;
