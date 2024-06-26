import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function ShowRating({ value }) {
  return (
    <Box
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
    >
      {/* <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, value) => 
          onChangeHandler
        }
      />
      <Typography component="legend">Read only</Typography> */}
      <Rating name="read-only" value={value ?? null} readOnly />
      {/* <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
  );
}
