import React, { useState } from "react";
import { Table, Input, Space, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaEye, FaFileExcel, FaFilePdf } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface QuoteData {
  key: string;
  quoteNo: string;
  farmersName: string;
  executive: string;
  quoteRecipe: string;
  weight: string;
  price: string;
  deliveryTime: string;
  status: string;
}

const QuoteHistoryTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("All");
  console.log(searchTerm, status);
  const data: QuoteData[] = [
    {
      key: "1",
      quoteNo: "2472",
      farmersName: "X Mans Farm",
      executive: "Asad Ujjaman",
      quoteRecipe: "NPKC Recipe 1, 2more",
      weight: "2 Tonnes",
      price: "R20,000",
      deliveryTime: "12/1/2024, 12:30 am",
      status: "Approved",
    },
    {
      key: "2",
      quoteNo: "2450",
      farmersName: "FLASH Point",
      executive: "Fahim",
      quoteRecipe: "NPKC Recipe 1, 1more",
      weight: "22 Tonnes",
      price: "R220,000",
      deliveryTime: "12/1/2024, 12:30 am",
      status: "Approved",
    },
    {
      key: "3",
      quoteNo: "2450",
      farmersName: "Wayne Farm",
      executive: "Sabbir",
      quoteRecipe: "NPKC Recipe 1, 1more",
      weight: "22 Tonnes",
      price: "R220,000",
      deliveryTime: "12/1/2024, 12:30 am",
      status: "Approved",
    },
  ];

  const columns = [
    {
      title: "Quote No.",
      dataIndex: "quoteNo",
    },
    {
      title: "Farmers Name",
      dataIndex: "farmersName",
    },
    {
      title: "Executive",
      dataIndex: "executive",
    },
    {
      title: "Quote Recipe",
      dataIndex: "quoteRecipe",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span
          className={
            status === "Draft"
              ? "text-red-500"
              : status === "Pending"
              ? "text-orange-500"
              : status === "Sent"
              ? "text-blue-500"
              : status === "Approved"
              ? "text-green-500"
              : "text-gray-500"
          }
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: QuoteData) => (
        <Space>
          <FaFilePdf size={20} className="text-blue-600 cursor-pointer" />
          <Link to={`/quote-history/${record.quoteNo}`}>
            <FaEye size={20} className="text-gray-600 cursor-pointer" />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quote Update</h2>
        <div className="flex items-center gap-5">
          <FaFileExcel size={30} className="text-green-600 cursor-pointer" />
          <Input
            placeholder="Search here"
            prefix={<SearchOutlined />}
            className="w-60 py-3 rounded-3xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            defaultValue="All"
            className="w-40 "
            style={{ height: "45px", borderRadius: "20px" }}
            onChange={(value) => setStatus(value)}
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Draft">Draft</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Sent">Sent</Select.Option>
            <Select.Option value="Approved">Approved</Select.Option>
          </Select>
        </div>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default QuoteHistoryTable;
