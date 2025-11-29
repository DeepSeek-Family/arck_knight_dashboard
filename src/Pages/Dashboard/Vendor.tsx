import { Card, Table, Input, Tag } from "antd";
import {
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    week: "Sun",
    TotalSales: 4000,
    profit: 2400,
  },
  {
    week: "Mon",
    TotalSales: 3000,
    profit: 1398,
  },
  {
    week: "Tue",
    TotalSales: 2000,
    profit: 9800,
  },
  {
    week: "Wed",
    TotalSales: 2780,
    profit: 3908,
  },
  {
    week: "Thu",
    TotalSales: 1890,
    profit: 4800,
  },
  {
    week: "Fri",
    TotalSales: 2390,
    profit: 3800,
  },
  {
    week: "Sat",
    TotalSales: 3490,
    profit: 4300,
  },
];

const employeeData = {
  name: "Asadujjaman Mahfuz",
  designation: "Sales Executive",
  id: "FF4578EDD4",
  email: "Asadujjaman101@bd.com",
  contact: "073 155 4568",
  dob: "12 Nov, 2024",
  gender: "Male",
  address: "284 Daffodil Dr, Mount Frere, Eastern Cape-5088 South Africa",
  image: "https://via.placeholder.com/100",
};

const workList = [
  {
    id: 2450,
    farm: "X Mans Farm",
    manager: "Mr. Nadir",
    recipe: "NPKC Recipe 1, 2more",
    weight: "2 Tonnes",
    price: "R20,000",
    delivery: "12/1/2024, 12:30 am",
    status: "Pending",
  },
  {
    id: 2450,
    farm: "FLASH Point",
    manager: "Mr. Nadir",
    recipe: "NPKC Recipe 1, 1more",
    weight: "22 Tonnes",
    price: "R220,000",
    delivery: "12/1/2024, 12:30 am",
    status: "Processing",
  },
  {
    id: 2465,
    farm: "Wayne Farm",
    manager: "Babalwa Moloi",
    recipe: "NPKC Recipe 1, 1more",
    weight: "2 Tonnes",
    price: "R200,000",
    delivery: "12/1/2024, 12:30 am",
    status: "On way",
  },
  {
    id: 2465,
    farm: "Wayne Farm",
    manager: "SM. Albard",
    recipe: "NPKC Recipe 1, 1more",
    weight: "32 Tonnes",
    price: "R320,000",
    delivery: "12/1/2024, 12:30 am",
    status: "Delivered",
  },
];

const statusColors: Record<string, string> = {
  Pending: "red",
  Processing: "blue",
  "On way": "orange",
  Delivered: "green",
};

const EmployeeDetails = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex h-[530px] w-full gap-2">
        <Card className="p-4 w-4/6 shadow-md">
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-6">
              <img
                src={"https://i.ibb.co.com/hF8qFB5L/Rectangle-5330.png"}
                alt="Employee"
                className="w-72 h-72"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold">{employeeData.name}</h2>
                <p className="text-blue-500 text-lg">
                  {employeeData.designation}
                </p>
              </div>
            </div>
            <div className="grid gap-4 mt-4">
              {Object.entries(employeeData).map(
                ([key, value]) =>
                  key !== "image" && (
                    <p key={key}>
                      <span className="font-semibold capitalize">
                        {key.replace("_", " ")}:
                      </span>{" "}
                      {value}
                    </p>
                  )
              )}
            </div>
          </div>
        </Card>
        {employeeData?.designation === "Sales Executive" && (
          <Card className="p-1 w-2/6 shadow-md">
            <div>
              <h1 className="text-xl font-semibold">Performance Statistics</h1>
              <div className="grid grid-cols-3 gap-2 my-10">
                <div className="bg-green-100 rounded-2xl p-4">
                  <p className="text-sm">Sales This Week</p>
                  <p className="text-xl text-center font-semibold">0</p>
                </div>
                <div className="bg-green-100 rounded-2xl p-4">
                  <p className="text-sm">Sales Last Week</p>
                  <p className="text-xl text-center font-semibold">0</p>
                </div>
                <div className="bg-green-100 rounded-2xl p-4">
                  <p className="text-sm">Sales All Time</p>
                  <p className="text-xl text-center font-semibold">0</p>
                </div>
              </div>
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="TotalSales"
                      fill="#6DBD44"
                      barSize={20}
                      radius={[20, 20, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        )}
      </div>

      {employeeData?.designation === "Sales Executive" && (
        <div className="mt-6 bg-white p-4 shadow-md rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Work List of Employees</h3>
            <Input
              placeholder="Search here"
              prefix={<SearchOutlined />}
              className="w-64"
            />
          </div>
          <Table dataSource={workList} rowKey="id" pagination={{ pageSize: 5 }}>
            <Table.Column title="Quote no." dataIndex="id" key="id" />
            <Table.Column title="Farmers Name" dataIndex="farm" key="farm" />
            <Table.Column title="Manager" dataIndex="manager" key="manager" />
            <Table.Column
              title="Quote Recipe"
              dataIndex="recipe"
              key="recipe"
            />
            <Table.Column title="Weight" dataIndex="weight" key="weight" />
            <Table.Column title="Price" dataIndex="price" key="price" />
            <Table.Column
              title="Delivery Time"
              dataIndex="delivery"
              key="delivery"
            />
            <Table.Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status) => (
                <Tag color={statusColors[status]}>{status}</Tag>
              )}
            />
            <Table.Column
              title="Action"
              key="action"
              render={() => (
                <InfoCircleOutlined className="text-xl text-gray-600 cursor-pointer" />
              )}
            />
          </Table>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
