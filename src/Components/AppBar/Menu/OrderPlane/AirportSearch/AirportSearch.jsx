import React, { useState } from "react";
import { Box, TextField, List, ListItem, Typography, Divider } from "@mui/material";
import { FlightTakeoff } from "@mui/icons-material";

const AirportSearchForm = ({ label, onSelect, inputProps,airports }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filteredAirports = airports.filter((airport) =>
        airport.name.toLowerCase().includes(value.toLowerCase()) ||
        airport.code.toLowerCase().includes(value.toLowerCase()) ||
        airport.province.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredAirports);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (airport) => {
    onSelect(airport);
    setQuery(`${airport.name} (${airport.code})`);
    setSuggestions([]);
  };

  const groupByProvince = (airports) => {
    return airports.reduce((groups, airport) => {
      const provinceName = airport.province.name;
      if (!groups[provinceName]) {
        groups[provinceName] = [];
      }
      groups[provinceName].push(airport);
      return groups;
    }, {});
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={query}
        onChange={handleSearch}
        InputProps={inputProps}
      />
      {suggestions.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            zIndex: 10,
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            maxHeight: "500px", // Chiều cao tối đa
            overflowY: "auto", // Thêm thanh cuộn khi nội dung vượt quá chiều cao
          }}
        >
          <List>
            {Object.entries(groupByProvince(suggestions)).map(([location, airports], index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    padding: "10px 15px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mọi sân bay
                    </Typography>
                  </Box>
                </ListItem>
                <Divider />
                {airports.map((airport, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem
                      button
                      onClick={() => handleSelect(airport)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 15px",
                      }}
                    >
                      <FlightTakeoff sx={{ color: "#555" }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">{airport.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {airport.address}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#555", whiteSpace: "nowrap" }}
                      >
                        {airport.code}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AirportSearchForm;
