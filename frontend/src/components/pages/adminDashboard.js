import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Tag, message } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Column } = Table;

const AdminDashboard = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios
      .get("http://localhost:5000/api/documents")
      .then((response) => setDocuments(response.data))
      .catch((error) => message.error("Error fetching documents"));
  };

  const handleStatusChange = (id, status) => {
    axios
      .put(`http://localhost:5000/api/documents/${id}`, { status })
      .then(() => {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc._id === id ? { ...doc, status } : doc
          )
        );
        message.success(`Document status updated to ${status}`);
      })
      .catch((error) => message.error("Error updating document status"));
  };

  return (
    <div className=" p-4 bg-white m-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
      </div>

      <Table
        dataSource={documents}
        rowKey="_id"
        className="shadow-md rounded-lg"
        pagination={{ pageSize: 10 }}
        style={{ backgroundColor: "#fff" }} // Ensures the table background is white
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Document Type" dataIndex="docType" key="docType" />
        <Column
          title="Date Created"
          dataIndex="createdAt"
          key="createdAt"
          render={(createdAt) => (
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag
              color={status === "Verified" ? "green" : "gold"}
              icon={
                status === "Verified" ? (
                  <CheckCircleOutlined />
                ) : (
                  <ClockCircleOutlined />
                )
              }
            >
              {status}
            </Tag>
          )}
        />
        <Column
          title="Actions"
          key="actions"
          render={(_, record) => (
            <div className="space-x-2">
              <Button
                size="small"
                onClick={() => handleStatusChange(record._id, "Verified")}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Verify
              </Button>
              <Button
                size="small"
                onClick={() => handleStatusChange(record._id, "Pending")}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Set Pending
              </Button>
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default AdminDashboard;
