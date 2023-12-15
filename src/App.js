// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    flex-grow: 1;
    margin-right: 10px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

const CountryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
  }
`;

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch countries data from the provided API
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      // Fetch countries data from the API
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const allCountries = response.data;

      // Filter countries based on the search term
      const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setCountries(filteredCountries);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const resetSearch = async () => {
    try {
      // Reset to show all countries
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <Header>Country Information</Header>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search by country name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </SearchContainer>
      <CountryList>
        {countries.map(country => (
          <li key={country.name.common}>
            <strong>Name:</strong> {country.name.common} | <strong>Region:</strong> {country.region} | <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
          </li>
        ))}
      </CountryList>
    </Container>
  );
}

export default App;












