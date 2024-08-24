import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PinDetail = () => {
  const { pin } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPinDetails = async () => {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const result = await response.json();

        if (result[0].Status === 'Error') { // Capital "S" for Status
          setError('Invalid pin or no data available');
        } else {
          setData(result[0].PostOffice);
          setFilteredData(result[0].PostOffice); // Initialize filteredData with all data
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPinDetails();
  }, [pin]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the data based on the search term
    const filtered = data.filter((office) =>
      office.Name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="h-full w-[90%] flex flex-col items-start ml-8 mt-5 gap-3">
      <h1 className="font-bold text-[18px] tracking-wide">Pincode: {pin}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2">
        <h1 className="font-bold text-[18px] tracking-wide">Message:</h1>
        <span>{filteredData.length} post office(s) found</span>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Filter by name, branch type, district, or division"
        className="border-2 border-black rounded px-2 w-full py-2 mt-5 focus:placeholder-transparent focus:outline-none"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Display Filtered Results */}
      {filteredData.length > 0 ? (
        <div className="card-holder mt-3 w-full flex gap-6 flex-wrap">
          {filteredData.map((office, index) => (
            <div
              key={index}
              className="flex flex-col border-2 border-black rounded-lg w-[49%] gap-4 h-[38vh] px-5 text-[18px] py-4"
            >
              <p><strong>Name:</strong> {office.Name}</p>
              <p><strong>Branch Type:</strong> {office.BranchType}</p>
              <p><strong>Delivery Status:</strong> {office.DeliveryStatus}</p>
              <p><strong>District:</strong> {office.District}</p>
              <p><strong>Division:</strong> {office.Division}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default PinDetail;
