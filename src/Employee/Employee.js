import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Employee.css";

const Employee = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [startDateMin, setStartDateMin] = useState("");
  const [startDateMax, setStartDateMax] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  // Sorting state
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7255/api/Employee")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, []);

  // Handle filtering
  useEffect(() => {
    let filtered = data.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minSalary) {
      filtered = filtered.filter((employee) => employee.salary >= parseFloat(minSalary));
    }

    if (maxSalary) {
      filtered = filtered.filter((employee) => employee.salary <= parseFloat(maxSalary));
    }

    if (startDateMin) {
      const minDate = new Date(startDateMin);
      filtered = filtered.filter((employee) => new Date(employee.startDate) >= minDate);
    }

    if (startDateMax) {
      const maxDate = new Date(startDateMax);
      filtered = filtered.filter((employee) => new Date(employee.startDate) <= maxDate);
    }

    setFilteredData(filtered);
  }, [searchTerm, minSalary, maxSalary, startDateMin, startDateMax, data]);

  // Handle sorting
  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
    setSortField(field);
    setSortOrder(order);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleRowClick = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div>
      <div className="center-title">
        <h1>Employees List View</h1>
        <p>Click on a row to edit employee details</p>
      </div>

      {/* Search and Filter Inputs */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Salary"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date Min"
          value={startDateMin}
          onChange={(e) => setStartDateMin(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date Max"
          value={startDateMax}
          onChange={(e) => setStartDateMax(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
            <th>Email</th>
            <th onClick={() => handleSort("jobTitle")}>Job Title {sortField === "jobTitle" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => handleSort("salary")}>Salary {sortField === "salary" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
            <th onClick={() => handleSort("startDate")}>Start Date {sortField === "startDate" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => (
            <tr key={employee.id} onClick={() => handleRowClick(employee.id)}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.jobTitle}</td>
              <td>${employee.salary}</td>
              <td>{new Date(employee.startDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Employee;
