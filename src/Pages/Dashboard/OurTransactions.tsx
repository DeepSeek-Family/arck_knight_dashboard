import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface TransactionData {
  key: string;
  transactionId: string;
  customerName: string;
  serviceName: string;
  barberName: string;
  amount: string;
  date: string;
  paymentMethod: string;
  status: string;
  commission: string;
  netEarnings: string;
  price?: number;
  adminEarning?: number;
}

const dummyData: TransactionData[] = [
  {
    key: "1",
    transactionId: "TXN001",
    customerName: "Alice Brown",
    serviceName: "Haircut",
    barberName: "John Doe",
    amount: "$50",
    date: "2024-12-18",
    paymentMethod: "Credit Card",
    status: "Completed",
    commission: "$7.50",
    netEarnings: "$42.50",
  },
  {
    key: "2",
    transactionId: "TXN002",
    customerName: "Bob Smith",
    serviceName: "Beard Trim",
    barberName: "Jane Smith",
    amount: "$30",
    date: "2024-12-17",
    paymentMethod: "Cash",
    status: "Completed",
    commission: "$4.50",
    netEarnings: "$25.50",
  },
];

const OurTransactions: React.FC = () => {
  const [filteredData, setFilteredData] =
    useState<TransactionData[]>(dummyData);

  const columns: ColumnsType<TransactionData> = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "Net Earnings",
      dataIndex: "netEarnings",
      key: "netEarnings",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const handleFilterChange = (value: string): void => {
    if (value === "all") {
      setFilteredData(dummyData);
    } else {
      const filtered = dummyData.filter((item) => item.status === value);
      setFilteredData(filtered);
    }
  };
  console.log(handleFilterChange);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-start">
        Our Transactions
      </h1>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OurTransactions;
