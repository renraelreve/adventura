import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function DisplayRating({ value, onChange }) {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend" style={{ fontSize: 20 }}>
          My Ratings!
        </Typography>
        {/* Use the value and onChange handlers passed as props */}
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            // Call the onChange function passed as props
            onChange(newValue);
          }}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "orange", // Change the color of filled stars
              fontSize: 25,
            },
            "& .MuiRating-iconEmpty": {
              color: "grey", // Change the color of empty stars
              fontSize: 25,
            },
          }}
        />
      </Box>
    </div>
  );
}
