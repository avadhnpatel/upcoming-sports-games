import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import teams from '../teams.json'


const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });


export default function SearchBar(props) {
  const { inputValue, setInputValue } = props;
  
  return (
      <Autocomplete
        id="combo-box-demo"
        className="custom-autocomplete"
        filterOptions={filterOptions}
        options={teams}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
        getOptionLabel={(option) => option.team_name || ""}
        renderInput={(params) => <TextField {...params} style={{ backgroundColor: "white" }} label="" />}
      />
  );
}



