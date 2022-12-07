import "./App.css";
import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCity] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.openaq.org/v2/cities?country=GB")
      .then((response) => {
        setCities(
          response.data.results.map((item) => {
            return {
              name: item.city,
              id: item.city,
              lastUpdated: item.lastUpdated,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOnSelect = (result) => {
    if (selectedCities.some((item) => item.name === result.name)) {
      return;
    }

    if (selectedCities.length >= 2) {
      selectedCities.shift();
    }

    axios
      .get(`https://api.openaq.org/v2/latest?city=${result.name}&country=GB`)
      .then((response) => {
        setSelectedCity([
          ...selectedCities,
          {
            name: result.name,
            id: result.id,
            lastUpdated: result.lastUpdated,
            locations: response.data.results.map((item) => {
              return {
                name: item.location,
                country: item.country,
                measurements: item.measurements,
              };
            }),
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountry = (country) => {
    if (country === "GB") {
      return "United Kingdom";
    }
  };

  const clearLocation = (city, location) => {
    // Find location in city locations and remove it
    const cityIndex = selectedCities.findIndex((item) => item.name === city);

    const locationIndex = selectedCities[cityIndex].locations.findIndex(
      (item) => item.name === location
    );

    selectedCities[cityIndex].locations.splice(locationIndex, 1);

    // If no locations left in city, remove city
    if (selectedCities[cityIndex].locations.length === 0) {
      selectedCities.splice(cityIndex, 1);
    }

    // Update state
    setSelectedCity([...selectedCities]);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    let floor = Math.floor(interval);
    if (interval > 1) {
      return floor === 1 ? +"a year" : `${floor} years`;
    }
    interval = seconds / 2592000;
    floor = Math.floor(interval);
    if (interval > 1) {
      return floor === 1 ? "a month" : `${floor} months`;
    }
    interval = seconds / 86400;
    floor = Math.floor(interval);
    if (interval > 1) {
      return floor === 1 ? "a day" : `${floor} days`;
    }
    interval = seconds / 3600;
    floor = Math.floor(interval);
    if (interval > 1) {
      return floor === 1 ? "an hour" : `${floor} hours`;
    }
    interval = seconds / 60;
    floor = Math.floor(interval);
    if (interval > 1) {
      return floor === 1 ? "a minute" : `${floor} minutes`;
    }
    return Math.floor(seconds) === 1
      ? "a second"
      : `${Math.floor(seconds)} seconds`;
  };

  return (
    <div className="container">
      <div className="intro">
        <h1>Compare your Air</h1>
        <h2>
          Compare the air quality between cities in the UK. <br /> Select cities
          to compare using the search tool below.
        </h2>
      </div>

      <div className="search">
        <ReactSearchAutocomplete
          items={cities}
          onSelect={handleOnSelect}
          autoFocus
        />
      </div>

      {/* Render city tiles */}
      {selectedCities.length > 0 && (
        <div className="city-tiles">
          {selectedCities.map((city) => (
            <div className="city-locations" key={city.name}>
              <h2 className="city-name">{city.name}</h2>

              {city.locations.map((location, index) => (
                <div
                  className="city-tile"
                  key={`${city.name}-${location.name}-${index}`}
                >
                  <div className="close">
                    <button
                      onClick={() => clearLocation(city.name, location.name)}
                    >
                      close
                    </button>
                  </div>

                  <span className="time">
                    Updated {timeAgo(city.lastUpdated)} ago
                  </span>
                  <h2>{location.name}</h2>

                  <span className="location">
                    in {city.name}, {getCountry(location.country)}
                  </span>

                  <div className="city-tile__location__measurements">
                    <strong>
                      Values:{" "}
                      {location.measurements.map((measurement) => (
                        <span
                          className="measurement"
                          key={`${location.name}-${measurement.parameter}`}
                        >
                          {measurement.parameter}: {measurement.value}
                          {location.measurements.length - 1 !==
                            location.measurements.indexOf(measurement) && ", "}
                        </span>
                      ))}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
