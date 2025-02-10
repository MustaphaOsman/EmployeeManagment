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
  const [itemsPerPage] = useState(15); // Number of items per page

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

  const handleCardClick = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div>
      <div className="center-title">
        <h1>Employees Multi-View</h1>
        <h8>Click on Card to Edit the Person</h8>
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

      {/* Entity List */}
      <div className="entity-list">
        {currentItems.map((entity) => (
          <div
            key={entity.id}
            className="entity-card"
            onClick={() => handleCardClick(entity.id)}
          >
            <div className="entity-item">
              <strong>Name:</strong> {entity.name}
            </div>
            <div className="entity-item">
              <strong>Email:</strong> {entity.email}
            </div>
            <div className="entity-item">
              <strong>Job Title:</strong> {entity.jobTitle}
            </div>
            <div className="entity-item">
              <strong>Salary:</strong> ${entity.salary}
            </div>
            <div className="entity-item">
              <strong>Start Date:</strong> {new Date(entity.startDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
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
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Employee;
