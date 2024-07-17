import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(companies);
    }
    getCompanies();
  }, [searchTerm]);

  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a company..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {companies.map(c => (
        <Link to={`/companies/${c.handle}`} key={c.handle}>
          <CompanyCard company={c} />
        </Link>
      ))}
    </div>
  );
}

export default CompanyList;