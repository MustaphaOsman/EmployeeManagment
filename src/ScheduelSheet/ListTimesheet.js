import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../ScheduelSheet/Scheduel.css";

const TimesheetList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [startDateMin, setStartDateMin] = useState("");
  const [startDateMax, setStartDateMax] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting state
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7255/api/Timesheet")
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
    let filtered = data;

    if (employeeName) {
      filtered = filtered.filter((item) =>
        item.employeeName.toLowerCase().includes(employeeName.toLowerCase())
      );
    }

    if (startDateMin) {
      const minDate = new Date(startDateMin);
      filtered = filtered.filter((item) => new Date(item.startTime) >= minDate);
    }

    if (startDateMax) {
      const maxDate = new Date(startDateMax);
      filtered = filtered.filter((item) => new Date(item.startTime) <= maxDate);
    }

    setFilteredData(filtered);
  }, [employeeName, startDateMin, startDateMax, data]);

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
    navigate(`/timesheet/${id}`);
  };

  return (
    <div>
      <div className="center-title">
        <h1>Employee Timesheets</h1>
        <p>Click on a row to view timesheet details</p>
      </div>

      {/* Search and Filter Inputs */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
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

      {/* Timesheet Table */}
      <table className="timesheet-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("employeeName")}>
              Employee Name {sortField === "employeeName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("startTime")}>
              Start Time {sortField === "startTime" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("endTime")}>
              End Time {sortField === "endTime" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Work Summary</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item.id)}>
              <td>{item.employeeName}</td>
              <td>{new Date(item.startTime).toLocaleString()}</td>
              <td>{new Date(item.endTime).toLocaleString()}</td>
              <td>{item.workSummary}</td>
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

export default TimesheetList;