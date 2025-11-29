import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  ConfigProvider,
  Spin,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useGeneralStatsQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from "@/redux/apiSlices/dashboardSlice";

const { Option } = Select;

interface UserData {
  key: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isBanned: boolean;
  joinDate: string;
  lastLogin: string;
  createdAt: string;
}

interface UserFormValues {
  name: string;
  email: string;
  role: string;
  isBanned: string | boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const { data, isLoading, refetch } = useGeneralStatsQuery({
    page: currentPage,
    limit: pageSize,
  });
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    if (data?.data) {
      // Map the API response to ensure userId is available
      const mappedUsers = (Array.isArray(data.data) ? data.data : []).map(
        (user: any) => ({
          key: user._id || user.id || user.userId || "",
          userId: user._id || user.id || user.userId || "",
          name: user.name || "",
          email: user.email || "",
          role: user.role || "",
          status: user.status || "",
          isBanned: user.isBanned || false,
          joinDate: user.joinDate || "",
          lastLogin: user.lastLogin || "",
          createdAt: user.createdAt || "",
        })
      );
      setUsers(mappedUsers);
      // Set total count from API response pagination object
      setTotal(data.pagination?.total || mappedUsers.length);
      console.log("User Data in Users Page:", mappedUsers);
      console.log("Total Users:", data.pagination?.total);
    }
  }, [data]);

  if (isLoading) {
    return <Spin size="large" className="flex items-center justify-center" />;
  }

  const columns: ColumnsType<UserData> = [
    {
      title: "User ID",
      key: "userId",
      render: (_text, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "joinDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
    },
    {
      title: "Status",
      dataIndex: "isBanned",
      key: "status",
      render: (isBanned: boolean) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            isBanned === false
              ? "bg-[#3F51B5] text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {isBanned === false ? "Active" : "Banned"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: UserData) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={isUpdating}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.userId)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (user: UserData): void => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      isBanned: String(user.isBanned),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (key: string): void => {
    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteUser(key).unwrap();
          message.success("User deleted successfully");
          await refetch();
        } catch (error: any) {
          console.error("Delete error:", error);
          message.error(error?.data?.message || "Failed to delete user");
        }
      },
    });
  };

  const handleAdd = (): void => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUserBan = async () => {
    if (!editingUser) {
      message.error("No user selected");
      return;
    }

    try {
      const values = await form.validateFields();

      if (!editingUser.userId) {
        message.error("User ID is missing");
        return;
      }

      // Convert form value to boolean
      // Form stores as string: "true" or "false"
      const isBannedValue = values.isBanned === "true";

      console.log(
        "Form isBanned:",
        values.isBanned,
        "Type:",
        typeof values.isBanned
      );
      console.log("Converted isBannedValue:", isBannedValue);

      await updateUserStatus({
        userId: editingUser.userId,
        isBanned: isBannedValue,
      }).unwrap();

      message.success("User status updated successfully");
      await refetch();
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error: any) {
      console.error("Update error:", error);
      message.error(error?.data?.message || "User status update failed");
    }
  };

  const handleModalCancel = (): void => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add User
        </Button>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#D2EBC5",
              headerColor: "black",
              colorBgContainer: "white",
              colorText: "black",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
          rowKey={(record) => record.userId}
          scroll={{ x: 1000 }}
          loading={isUpdating}
        />
      </ConfigProvider>
      <Modal
        title={editingUser ? "Edit User Status" : "Add New User"}
        open={isModalVisible}
        onOk={handleUserBan}
        onCancel={handleModalCancel}
        okText={editingUser ? "Update" : "Add"}
        confirmLoading={isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input disabled={!!editingUser} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input disabled={!!editingUser} />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select disabled={!!editingUser}>
              <Option value="SUPER_ADMIN">SUPER ADMIN</Option>
              <Option value="USER">USER</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="isBanned"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="false">Active</Option>
              <Option value="true">Banned</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
