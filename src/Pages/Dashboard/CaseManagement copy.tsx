import { useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  ConfigProvider,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useGetCaseQuery } from "@/redux/apiSlices/caseManagementSlice";
const CaseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [editForm] = Form.useForm();
  const [cableDetails, setCableDetails] = useState<any[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryParams = [
    { name: "page", value: String(page) },
    { name: "limit", value: String(limit) },
  ];
  if (searchText.trim()) {
    queryParams.push({ name: "searchTerm", value: searchText.trim() });
  }

  const { data: response } = useGetCaseQuery<{
    data: any[];
    pagination?: { total: number };
  }>(queryParams);

  const tableData = useMemo(() => {
    const items = (response as any)?.data || [];
    return items.map((item: any) => ({
      key: item._id,
      id: item._id,
      caseName: item.case_name || "-",
      caseType: item.case_type || "-",
      caseLocation: item.case_location || "-",
      casePlace: item.case_place || "-",
      cableCount: item.cable_details?.length || 0,
      createdAt: item.createdAt || "-",
      updatedAt: item.updatedAt || "-",
      raw: item,
    }));
  }, [response]);

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    if (newPageSize !== limit) {
      setLimit(newPageSize);
    }
  };

  // Sync URL params with state
  useEffect(() => {
    const params: Record<string, any> = {};

    params.page = page;
    params.limit = limit;

    if (searchText.trim()) {
      params.searchTerm = searchText.trim();
    }

    setSearchParams(params);
  }, [page, limit, searchText, setSearchParams]);

  useEffect(() => {
    const urlPage = searchParams.get("page");
    const urlSearch = searchParams.get("searchTerm");

    if (urlPage) setPage(Number(urlPage));
    if (urlSearch) setSearchText(urlSearch);
  }, [searchParams]);

  // Dummy data for staff
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Case Name",
      dataIndex: "caseName",
      key: "caseName",
      width: 200,
    },
    {
      title: "Case Type",
      dataIndex: "caseType",
      key: "caseType",
      width: 120,
      render: (caseType: string) => <Tag color="blue">{caseType}</Tag>,
    },
    {
      title: "Location",
      dataIndex: "caseLocation",
      key: "caseLocation",
      width: 150,
    },
    {
      title: "Place",
      dataIndex: "casePlace",
      key: "casePlace",
      width: 120,
    },
    {
      title: "Cables",
      dataIndex: "cableCount",
      key: "cableCount",
      width: 80,
      render: (count: number) => <Tag color="green">{count}</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (date: string) => {
        if (!date || date === "-") return "-";
        return new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      fixed: "right" as const,
      render: (_: any, record: any) => {
        return (
          <Space>
            <EyeOutlined
              className="cursor-pointer text-blue-600 text-xl"
              onClick={() => {
                setSelectedCase(record.raw);
                setIsDetailModalOpen(true);
              }}
            />
            <EditOutlined
              className="cursor-pointer text-blue-600 text-xl"
              onClick={() => {
                setSelectedCase(record.raw);
                setCableDetails(record.raw.cable_details || []);
                editForm.setFieldsValue({
                  case_name: record.raw.case_name,
                  case_type: record.raw.case_type,
                  case_location: record.raw.case_location,
                  case_place: record.raw.case_place,
                });
                setIsEditModalOpen(true);
              }}
            />
            <DeleteOutlined className="cursor-pointer text-red-600 text-xl" />
          </Space>
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalOpen(false);
    setSelectedCase(null);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setSelectedCase(null);
    setCableDetails([]);
    editForm.resetFields();
  };

  const handleEditSave = async () => {
    try {
      const values = await editForm.validateFields();
      // TODO: Call API to update case
      console.log("Updated values:", {
        ...values,
        cable_details: cableDetails,
      });
      handleEditModalCancel();
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const handleAddCable = () => {
    setCableDetails([
      ...cableDetails,
      {
        _id: Date.now().toString(),
        tag_name: "",
        year: "",
        make: "",
        foot_age: "",
        selected_date: "",
        note: "",
      },
    ]);
  };

  const handleRemoveCable = (index: number) => {
    setCableDetails(cableDetails.filter((_, i) => i !== index));
  };

  const handleCableChange = (index: number, field: string, value: any) => {
    const updatedCables = [...cableDetails];
    updatedCables[index] = {
      ...updatedCables[index],
      [field]: value,
    };
    setCableDetails(updatedCables);
  };

  return (
    <div className="bg-white p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-5">Case Management</h1>
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search by case name"
            style={{ width: 400, height: 50, borderRadius: 30 }}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
            value={searchText}
            prefix={<SearchOutlined className="text-primary" />}
          />
          <Button
            onClick={showModal}
            className="bg-primary border-none text-white py-6 rounded-3xl px-6"
          >
            <PlusOutlined /> Add Case
          </Button>
        </div>
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
          dataSource={tableData}
          pagination={{
            pageSize: limit,
            total: (response as any)?.pagination?.total || 0,
            current: page,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: handlePaginationChange,
          }}
          rowKey={(record) => record.key}
          scroll={{ x: 1200 }}
          loading={false}
        />
      </ConfigProvider>

      <Modal
        title="Add Case"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{
          className: "bg-primary border-none text-white py-6 rounded-3xl px-6",
        }}
        cancelButtonProps={{
          className: "border border-primary text-primary py-6 rounded-3xl px-6",
        }}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Case Name"
            name="caseName"
            rules={[{ required: true, message: "Please enter case name" }]}
          >
            <Input placeholder="Enter case name" />
          </Form.Item>
          <Form.Item
            label="Case Type"
            name="caseType"
            rules={[{ required: true, message: "Please enter case type" }]}
          >
            <Input placeholder="e.g., Fiber, Copper" />
          </Form.Item>
          <Form.Item
            label="Case Location"
            name="caseLocation"
            rules={[{ required: true, message: "Please enter case location" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item
            label="Case Place"
            name="casePlace"
            rules={[{ required: true, message: "Please enter case place" }]}
          >
            <Input placeholder="e.g., underground, aerial" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Case Details"
        open={isDetailModalOpen}
        onCancel={handleDetailModalCancel}
        footer={[
          <Button
            key="close"
            onClick={handleDetailModalCancel}
            className="border border-primary text-primary py-2 px-6 rounded-lg"
          >
            Close
          </Button>,
        ]}
        width={900}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {selectedCase && (
          <div className="space-y-6">
            {/* Case Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-primary">
                Case Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Case Name</p>
                  <p className="font-medium">{selectedCase.case_name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Case Type</p>
                  <p className="font-medium">
                    <Tag color="blue">{selectedCase.case_type || "-"}</Tag>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {selectedCase.case_location || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Place</p>
                  <p className="font-medium">
                    {selectedCase.case_place || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">
                    {new Date(selectedCase.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {new Date(selectedCase.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Cable Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-primary">
                Cable Specifications ({selectedCase.cable_details?.length || 0})
              </h3>
              {selectedCase.cable_details &&
              selectedCase.cable_details.length > 0 ? (
                <div className="space-y-4">
                  {selectedCase.cable_details.map(
                    (cable: any, index: number) => (
                      <div
                        key={cable._id || index}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-base">
                            Cable #{index + 1}
                          </h4>
                          <Tag color="cyan">{cable.tag_name}</Tag>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Tag Name</p>
                            <p className="font-medium">
                              {cable.tag_name || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">{cable.year || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Make</p>
                            <p className="font-medium">{cable.make || "-"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Footage</p>
                            <p className="font-medium">
                              {cable.foot_age || "-"}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">
                              {new Date(cable.selected_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          {cable.note && (
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Notes</p>
                              <p className="font-medium text-gray-700">
                                {cable.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">No cables added yet</p>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Edit Case"
        open={isEditModalOpen}
        onOk={handleEditSave}
        onCancel={handleEditModalCancel}
        okButtonProps={{
          className: "bg-primary border-none text-white py-2 px-6 rounded-lg",
        }}
        cancelButtonProps={{
          className: "border border-primary text-primary py-2 px-6 rounded-lg",
        }}
        width={900}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <Form form={editForm} layout="vertical">
          {/* Case Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-primary">
              Case Information
            </h3>
            <Form.Item
              label="Case Name"
              name="case_name"
              rules={[{ required: true, message: "Please enter case name" }]}
            >
              <Input placeholder="Enter case name" />
            </Form.Item>
            <Form.Item
              label="Case Type"
              name="case_type"
              rules={[{ required: true, message: "Please enter case type" }]}
            >
              <Input placeholder="e.g., Fiber, Copper" />
            </Form.Item>
            <Form.Item
              label="Case Location"
              name="case_location"
              rules={[
                { required: true, message: "Please enter case location" },
              ]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>
            <Form.Item
              label="Case Place"
              name="case_place"
              rules={[{ required: true, message: "Please enter case place" }]}
            >
              <Input placeholder="e.g., underground, aerial" />
            </Form.Item>
          </div>

          {/* Cable Specifications */}
          <div>
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-primary">
              <h3 className="text-lg font-semibold">Cable Specifications</h3>
              <Button
                type="primary"
                className="bg-primary"
                onClick={handleAddCable}
              >
                <PlusOutlined /> Add Cable
              </Button>
            </div>

            {cableDetails.length > 0 ? (
              <div className="space-y-4">
                {cableDetails.map((cable: any, index: number) => (
                  <div
                    key={cable._id || index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">Cable #{index + 1}</h4>
                      <Button
                        danger
                        size="small"
                        onClick={() => handleRemoveCable(index)}
                      >
                        <DeleteOutlined /> Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Tag Name
                        </label>
                        <Input
                          placeholder="e.g., TAG-001"
                          value={cable.tag_name}
                          onChange={(e) =>
                            handleCableChange(index, "tag_name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Year
                        </label>
                        <Input
                          placeholder="e.g., 2024"
                          value={cable.year}
                          onChange={(e) =>
                            handleCableChange(index, "year", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Make
                        </label>
                        <Input
                          placeholder="e.g., Samsung"
                          value={cable.make}
                          onChange={(e) =>
                            handleCableChange(index, "make", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Footage
                        </label>
                        <Input
                          placeholder="e.g., 200 feet"
                          value={cable.foot_age}
                          onChange={(e) =>
                            handleCableChange(index, "foot_age", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm text-gray-500 block mb-1">
                          Date
                        </label>
                        <Input
                          type="date"
                          value={
                            cable.selected_date
                              ? new Date(cable.selected_date)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handleCableChange(
                              index,
                              "selected_date",
                              new Date(e.target.value).toISOString()
                            )
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm text-gray-500 block mb-1">
                          Notes
                        </label>
                        <Input.TextArea
                          placeholder="Enter any notes"
                          rows={2}
                          value={cable.note}
                          onChange={(e) =>
                            handleCableChange(index, "note", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No cables added yet</p>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CaseManagement;
