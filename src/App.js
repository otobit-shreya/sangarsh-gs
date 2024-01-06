import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure to import your CSS file

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchSport, setSearchSport] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch('https://sheetdb.io/api/v1/m77j9jywf5lk0')
      .then((response) => response.json())
      .then((responseData) => {
        // Remove extra spaces from property names
        const cleanedData = responseData.map((item) => {
          const cleanedItem = {};
          for (const key in item) {
            cleanedItem[key.trim()] = item[key];
          }
          return cleanedItem;
        });

        setData(cleanedData);
        setFilteredData(cleanedData); // Set filteredData initially with all data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchSport(searchValue);

    // Filter the data based on the search value
    const filtered = data.filter((item) =>
      item["Sport"].toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  return (
    <>
      <div className="header">
        <img src="small-2.png" alt="Logo" className="logo" />
      </div>
      <div className="main">
        <div className="logo-main">
          <img src="sang.png" alt="img" />
        </div>
        <div>
          <h1 className="logo-main-text">Sangarsh 2024</h1>
          <p className="sub-text">Hosted by IIM Bangalore</p>
        </div>
        <div className="img-div">
          <div className="text-div">
            <p className="text">Title Sponsor</p>
            <img src="img1.png" alt="img1" className="imgclass" />
          </div>
          <div className="text-div">
            <p className="text-2">Associate Sponsor</p>
            <img src="img2.png" alt="img2" className="imgclass" />
          </div>
        </div>
        <div className="table-div">
          <div className="search-container">
            <input
              type="text"
              id="searchSport"
              className="search-input"
              value={searchSport}
              placeholder="Enter Sport Name here"
              onChange={handleSearchChange}
              style={{padding:'15px'}}
            />
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Sport</th>
                <th>Team1</th>
                <th>Team2</th>
                <th>Match Type</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item["Sport"]}</td>
                  <td>{item["Team1"]}</td>
                  <td>{item["Team2"]}</td>
                  <td>{item["Match Type"]}</td>
                  <td>{item["Winner"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
