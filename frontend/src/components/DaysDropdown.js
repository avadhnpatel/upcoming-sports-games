import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const nums = [{num:1}, {num:2}, {num:3}, {num:4}, {num:5}, {num:6}, {num:7}, {num:8}, {num:9}, {num:10}]

export default function DaysDropdown(props) {
  const { inputValue, setInputValue } = props;
  // console.log(inputValue)
  return (
    <Autocomplete
    className="custom-autocomplete"
      options={nums}
     inputValue={inputValue}
    onInputChange={(event, newInputValue) => {
      setInputValue(newInputValue);
    }}
    
      getOptionLabel={(option) => option.num || ""}
      renderInput={(params) => <TextField {...params} style={{ backgroundColor: "white" }} label='' />}
    />
  );
}



