import { useState, useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import { getEmployees, getEmployeeByName } from "../../api/employee";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState();
  const [sortedInfo, setSortedInfo] = useState({});

  const fetchEmployees = async () => {
    const { data } = await getEmployees();
    setEmployees(data.employees);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log( sorter);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.field === "name" ? sortedInfo.order : null,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.field === "email" ? sortedInfo.order : null,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortOrder: sortedInfo.field === "role" ? sortedInfo.order : null,
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortOrder: sortedInfo.field === "username" ? sortedInfo.order : null,
    },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const findByName = async () => {
    if (searchName) {
      const { data } = await getEmployeeByName(searchName);
      setEmployees(data);
    } else {
      fetchEmployees();
    }
  };

  return (
    <div>
      <Space direction="vertical">
        <Space wrap>
          <Input
            placeholder="Find by name"
            allowClear
            value={searchName}
            onChange={({ target }) => {
              setSearchName(target.value);
            }}
          />
          <Button type="primary" onClick={findByName}>
            Search
          </Button>
        </Space>
        <Space.Compact block></Space.Compact>
      </Space>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        onChange={handleChange}
      />
    </div>
  );
};

export default EmployeeTable;
