
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface OrderData {
  key: string;
  orderId: string;
  customerName: string;
  serviceName: string;
  barberName: string;
  price: string;
  status: string;
  appointmentTime: string;
  paymentMethod: string;
  customerContact: string;
  barberContact: string;
  notes: string;
  duration: string;
  earnings: string;
}

const dummyData: OrderData[] = [
  {
    key: "1",
    orderId: "ORD001",
    customerName: "Alice Brown",
    serviceName: "Haircut",
    barberName: "John Doe",
    price: "$50",
    status: "In Progress",
    appointmentTime: "2024-12-18 10:00 AM",
    paymentMethod: "Credit Card",
    customerContact: "+123456789",
    barberContact: "+987654321",
    notes: "Customer prefers a side part.",
    duration: "45 mins",
    earnings: "$7.50",
  },
  {
    key: "2",
    orderId: "ORD003",
    customerName: "Charlie Green",
    serviceName: "Facial",
    barberName: "Bob Johnson",
    price: "$40",
    status: "Pending",
    appointmentTime: "2024-12-19 02:00 PM",
    paymentMethod: "Online Payment",
    customerContact: "+123456781",
    barberContact: "+987654322",
    notes: "Client prefers organic products.",
    duration: "30 mins",
    earnings: "$6.00",
  },
  // Additional dummy data...
];

const RunningOrders = () => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Barber Name",
      dataIndex: "barberName",
      key: "barberName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Notes/Comments",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Earnings",
      dataIndex: "earnings",
      key: "earnings",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "In Progress"
              ? "bg-orange-200 text-orange-600"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: OrderData) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = (key: string): void => {
    console.log(`Deleting order with key: ${key}`);
    // Add logic to delete the order here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold  my-5">Orders</h1>
      <Table columns={columns} dataSource={dummyData} rowKey="key" />
    </div>
  );
};

export default RunningOrders;
