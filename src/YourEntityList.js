import React, { useEffect, useState } from "react";
import axios from "axios";

const YourEntityList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7255/api/YourEntity")  // Corrected URL
      .then((response) => {
        console.log(response.data);  // Log response
        setData(response.data);  // Set data in state
        setLoading(false);  // Set loading to false
      })
      .catch((error) => {
        console.error(error);  // Log any errors
        setError("Error fetching data: " + error.message);  // Set error message
        setLoading(false);  // Set loading to false in case of an error
      });
  }, []);  // Empty dependency array ensures the effect runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Entity List</h1>
      <ul>
        {data.map((entity) => (
          <li key={entity.id}>
            <strong>{entity.name}</strong> (ID: {entity.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourEntityList;
