import { useState } from "react";
import { Table, Input, Button, Modal, Form, Select, Upload } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import fertilizerImg from "../../assets/fertilizer.jpg";

interface StandardRecipeData {
  key: string;
  name: string;
  components: string;
  weight: string;
  price: string;
}

interface Material {
  name: string;
  quantity: string;
}

const standardRecipes = [
  {
    key: "70",
    name: "KAN",
    components: "28N+P+K+Zn+s",
    weight: "1Tonnes",
    price: "R200.00",
  },
  {
    key: "69",
    name: "Ureum",
    components: "48N+P+K+Zn+s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
  {
    key: "68",
    name: "MAP+S",
    components: "12N+20P+K+Zn+6s",
    weight: "20Tonnes",
    price: "R1000.00",
  },
  {
    key: "67",
    name: "KCL",
    components: "N+P+50K+Zn+s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
  {
    key: "66",
    name: "CAN",
    components: "28N+P+K+Zn+s",
    weight: "20Tonnes",
    price: "R1000.00",
  },
  {
    key: "65",
    name: "MAP 11/22",
    components: "11N+12.5P+50K+Zn+s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
  {
    key: "64",
    name: "Ureum Coated",
    components: "48N+P+K+Zn+s",
    weight: "20Tonnes",
    price: "R1000.00",
  },
  {
    key: "63",
    name: "Kalliumsulfaat",
    components: "N+P+42K+Zn+18s",
    weight: "20Tonnes",
    price: "R1000.00",
  },
  {
    key: "62",
    name: "Kaliumitraat",
    components: "13N+P+38K+Zn+s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
  {
    key: "61",
    name: "Sink",
    components: "N+P+K+34Zn+s",
    weight: "20Tonnes",
    price: "R1000.00",
  },
  {
    key: "60",
    name: "AmmSulf (G)",
    components: "21N+P+K+Zn+24s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
  {
    key: "59",
    name: "AmmSulf (F)",
    components: "21N+P+K+Zn+24s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
];

const initialRecipes = [
  {
    key: "70",
    name: "KAN",
    components: "28N+P+K+Zn+s",
    weight: "1Tonnes",
    price: "R200.00",
  },
  {
    key: "69",
    name: "Ureum",
    components: "48N+P+K+Zn+s",
    weight: "10Tonnes",
    price: "R1000.00",
  },
];

const StandardRecipe = () => {
  const [recipes, setRecipes] = useState<StandardRecipeData[]>(initialRecipes);
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<StandardRecipeData | null>(null);
  const [form] = Form.useForm();
  const [rowMaterials, setRowMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");

  const showModal = (record: StandardRecipeData) => {
    setSelectedRecipe(record);
    setIsViewModalVisible(true);
  };

  const handleClose = () => {
    setIsViewModalVisible(false);
    setSelectedRecipe(null);
  };

  const showAddModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record: StandardRecipeData) => {
    setIsEditMode(true);
    setSelectedRecipe(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecipe(null);
  };

  const handleFormSubmit = (values: any) => {
    if (isEditMode && selectedRecipe) {
      // Update existing recipe
      setRecipes((prev) =>
        prev.map((item) =>
          item.key === selectedRecipe.key ? { ...item, ...values } : item
        )
      );
    } else {
      // Add new recipe
      const newRecipe = { ...values, key: String(Date.now()) };
      setRecipes([...recipes, newRecipe]);
    }
    setIsModalVisible(false);
  };

  const handleAddMaterial = () => {
    if (newMaterial && newQuantity) {
      setRowMaterials([
        ...rowMaterials,
        { name: newMaterial, quantity: newQuantity },
      ]);
      setNewMaterial(""); // Reset input after adding
      setNewQuantity(""); // Reset quantity input after adding
    }
  };

  const columns = [
    { title: "Recipe Code", dataIndex: "key" },
    { title: "Name", dataIndex: "name" },
    { title: "Components", dataIndex: "components" },
    { title: "Weight", dataIndex: "weight" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: StandardRecipeData) => (
        <div className="flex space-x-2">
          <FaEye
            onClick={() => showModal(record)} // This opens the view details modal
            size={24}
            className="text-gray-600 cursor-pointer"
          />
          <FaEdit
            onClick={() => showEditModal(record)} // This opens the add/edit modal
            size={20}
            className="text-gray-600 cursor-pointer"
          />
          <FaTrashAlt size={20} className="text-red-600 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Standard Recipe</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search here"
            prefix={<SearchOutlined />}
            className="w-64"
            style={{ height: 42, borderRadius: 25 }}
          />
          <Button
            onClick={showAddModal}
            className="bg-primary text-white px-7 rounded-3xl py-5"
            icon={<PlusOutlined />}
          >
            Add Standard Recipe
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={standardRecipes}
        pagination={{ pageSize: 6 }}
      />

      <Modal
        title="Standard Recipe Details"
        open={isViewModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        {selectedRecipe && (
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <img
                src={fertilizerImg}
                alt={selectedRecipe.name}
                className="w-36 h-24 rounded-xl"
              />
              <div>
                <h3 className="text-lg font-bold">{selectedRecipe.name}</h3>
                <p className="text-green-600">{selectedRecipe.components}</p>
              </div>
            </div>

            <div className="my-5">
              <p className="text-lg font-semibold"> Weight:</p>
              <p className="text-gray-600">{selectedRecipe.weight}</p>
            </div>

            <div className="my-5">
              <p className="text-lg font-semibold">Price:</p>
              <p className="text-green-600">{selectedRecipe.price}</p>
            </div>

            <h4 className="text-lg font-semibold">Components</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Potassium (K)</p>
                <p className="bg-gray-200 px-4 py-1 rounded-lg">40%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Phosphorus (P)</p>
                <p className="bg-gray-200 px-4 py-1 rounded-lg">20%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Nitrogen (Ni)</p>
                <p className="bg-gray-200 px-4 py-1 rounded-lg">40%</p>
              </div>
            </div>

            <h4 className="mt-4 font-semibold">Ingredients</h4>
            <p className="text-gray-600">
              chloride (KCl), sulfate ( K 2SO 4), or nitrate ( KNO 3)
            </p>

            <h4 className="mt-4 font-semibold">Details</h4>
            <p className="text-gray-600">
              nibh consectetur volutpat at, nibh viverra massa Nam placerat
              elit. non efficitur. vitae luctus at ultrices urna nisi felis, In
              Morbi nec Nunc non orci elit leo. sit at, gravida at, est. Nullam
              Cras Nullam Ut elit. malesuada at, tincidunt quam fringilla
              convallis. nisi Lorem ultrices Nullam ullamcorper elementum{" "}
            </p>
          </div>
        )}
      </Modal>

      {/* Add & Edit Modal */}
      <Modal
        title={isEditMode ? "Edit Standard Recipe" : "Add Standard Recipe"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        okButtonProps={{ className: "bg-green-600 py-5 px-5 rounded-3xl" }}
        cancelButtonProps={{
          className: "border-green-600 text-green-600 py-5 px-5 rounded-3xl",
        }}
        style={{ width: "80vw", minWidth: "900px" }}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <div className="flex w-full gap-5">
            <div className="w-1/2">
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please enter the recipe name" },
                ]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>

              <div className="flex w-full gap-1">
                <Form.Item
                  name="1TonneSling"
                  label="1 Tonne Sling"
                  rules={[
                    { required: true, message: "Please enter 1 tonne sling" },
                  ]}
                >
                  <Input placeholder="Enter 1 Tonne Sling" />
                </Form.Item>
                <Form.Item
                  name="2TonneSling"
                  label={<h1 className="text-sm">2 Tonne Sling</h1>}
                  rules={[
                    { required: true, message: "Please enter 2 tonne sling" },
                  ]}
                >
                  <Input placeholder="Enter 2 Tonne Sling" />
                </Form.Item>
                <Form.Item
                  name="1pallet"
                  label="1 Pallet"
                  rules={[{ required: true, message: "Please enter 1 pallet" }]}
                >
                  <Input placeholder="Enter 1 Pallet" />
                </Form.Item>
              </div>

              <div className="flex w-full gap-1">
                <Form.Item
                  name="skoonPrice"
                  className="w-1/2"
                  label="Skoon Price"
                  rules={[{ required: true, message: "Please enter weight" }]}
                >
                  <Input placeholder="Enter Weight" />
                </Form.Item>
                <Form.Item
                  name="mengselPrice"
                  className="w-1/2"
                  label="Mengsel Price"
                  rules={[{ required: true, message: "Please enter weight" }]}
                >
                  <Input placeholder="Enter Weight" />
                </Form.Item>
              </div>

              <Form.Item
                name="weight"
                label="Weight"
                rules={[{ required: true, message: "Please select weight" }]}
              >
                <Select placeholder="Select Weight">
                  <Select.Option value="1tn">1 Tonne</Select.Option>
                  <Select.Option value="2tn">2 Tonnes</Select.Option>
                  <Select.Option value="5tn">5 Tonnes</Select.Option>
                  <Select.Option value="10tn">10 Tonnes</Select.Option>
                  <Select.Option value="20tn">20 Tonnes</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="ingredients"
                label="Ingredients"
                rules={[
                  { required: true, message: "Please enter ingredients" },
                ]}
              >
                <Input placeholder="Enter Ingredients" />
              </Form.Item>

              <Form.Item
                name="details"
                label="Details"
                rules={[{ required: true, message: "Please enter details" }]}
              >
                <Input.TextArea placeholder="Enter Details" rows={4} />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item
                name="image"
                label="Recipe Image"
                rules={[{ required: true, message: "Please upload image" }]}
                className="w-full"
              >
                <Upload
                  listType="picture-card"
                  className="w-full"
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <div>
                    <PlusCircleOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <div>
                <h3 className="text-lg">Row Materials</h3>
                <div className="flex items-center gap-2">
                  <Input
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="Enter Material"
                  />
                  <Input
                    value={newQuantity}
                    onChange={(e) =>
                      setNewQuantity(e.target.value.replace(/\D/, ""))
                    }
                    placeholder="%"
                    style={{ width: "100px" }}
                    type="number"
                  />
                  <Button
                    type="default"
                    icon={<FaPlus />}
                    onClick={handleAddMaterial}
                  />
                </div>
                <div className="my-5 border h-[328px] rounded-xl p-3">
                  {rowMaterials.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <p className="text-gray-600">
                        {material.name} - {material.quantity}%
                      </p>
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          const updatedMaterials = rowMaterials.filter(
                            (_, i) => i !== index
                          );
                          setRowMaterials(updatedMaterials);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StandardRecipe;
