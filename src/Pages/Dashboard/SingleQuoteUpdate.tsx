import { Card, Table, Button } from "antd";
import {
  PrinterOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const QuoteDetails = () => {
  const summaryData = [
    { key: "1", label: "Subtotal", value: "R400" },
    { key: "2", label: "Freight & Logistics", value: "R350" },
    { key: "3", label: "Adjust Points", value: "10%" },
    { key: "4", label: "Total", value: "R1180" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            Quotes status: <span className="text-red-500">Pending</span>
          </span>
          <Button icon={<PrinterOutlined />} type="default">
            Print
          </Button>
        </div>
      </Card>

      <Card className="mb-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
          <div>
            <p className="font-semibold">Quote no.</p>
            <p>2472</p>
          </div>
          <div>
            <p className="font-semibold">Executive</p>
            <p>Asad ujjaman</p>
          </div>
          <div>
            <p className="font-semibold">Customer Address</p>
            <p>
              X Mans Farm <InfoCircleOutlined />
            </p>
            <p className="w-[80%]">
              <EnvironmentOutlined className="text-red-500" /> 1 Emerald Blvd,
              Modderfontein, Gauteng
            </p>
          </div>
          <div>
            <p className="font-semibold">Warehouse Address</p>
            <p>Warehouse 1</p>
            <p className="w-[80%]">
              <EnvironmentOutlined className="text-red-500" /> 2492 Sandown Rd,
              Gauteng
            </p>
          </div>
          <div>
            <p className="font-semibold">Distance</p>
            <p>
              <EnvironmentOutlined className="text-blue-500" /> 20 km
            </p>
          </div>
          <div>
            <p className="font-semibold">Acceptance Date</p>
            <p className="text-blue-500">12/1/2024, 12:30 am</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
        <Card title="Recipe Details">
          <Table
            columns={[
              {
                title: "Recipe Name",
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                  <span className="flex items-center gap-2">
                    <img
                      src={record?.image}
                      className="w-12 h-12 rounded-full"
                      alt=""
                    />
                    {text}
                  </span>
                ),
              },
              { title: "Item", dataIndex: "item", key: "item" },
              { title: "Weight", dataIndex: "weight", key: "weight" },
              { title: "Price", dataIndex: "price", key: "price" },
            ]}
            dataSource={[
              {
                key: "1",
                name: "NPKC Recipe",
                item: "20 Pcs",
                weight: "20 Tonnes",
                price: "R400",
                image:
                  "https://cdn.shopify.com/s/files/1/0569/9675/7697/files/what-is-plant-fertilizer-made-of_1024x1024.jpg?v=1655088556",
              },
            ]}
            pagination={false}
          />
        </Card>

        <Card title="Summary">
          <ul>
            {summaryData.map((item) => (
              <li key={item.key} className="flex justify-between border-b py-2">
                <span className={item.key === "4" ? "font-bold" : ""}>
                  {item.label}
                </span>
                <span
                  className={
                    item.label === "Total" ? "text-green-500 font-bold" : ""
                  }
                >
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default QuoteDetails;