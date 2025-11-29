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
  isBanned: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const { data, isLoading, refetch } = useGeneralStatsQuery(undefined);
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
      console.log("User Data in Users Page:", data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Spin size="large" className="flex items-center justify-center" />;
  }

  const columns: ColumnsType<UserData> = [
    {
      title: "User ID",
      key: "userId",
      render: (_text, _record, index) => index + 1,
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
          className={`px-2 py-1 text-xs rounded-full ${isBanned === false
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
            onClick={() => handleDelete(record.key)}
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
      isBanned: user.isBanned,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (key: string): void => {
    setUsers(users.filter((user) => user.key !== key));
  };

  const handleAdd = (): void => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleUserBan = async () => {
    try {
      const res = await updateUserStatus({
        userId: editingUser?.userId || "",
        isBanned: editingUser?.isBanned || false,
      }).unwrap();
      if (res.success === true) {
        message.success("User status updated successfully");
      }

      await refetch();
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);

    } catch (error) {
      message.error("User status update failed");
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
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
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
              <Option value={false}>Active</Option>
              <Option value={true}>Banned</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;