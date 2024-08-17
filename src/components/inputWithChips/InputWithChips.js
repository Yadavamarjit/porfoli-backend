import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDebounce } from "../../hooks/useDebounce";
import axios from "axios";
import { Link } from "react-router-dom";

export const InputWithChips = ({ onChange, customClass, selected }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    selected?.length && setSelectedOptions(selected);
  }, [selected]);

  const handleOptionClick = (event, value) => {
    if (value) {
      setSelectedOptions([...selectedOptions, value]);
      onChange([...selectedOptions, value]);
      setInput("");
    }
    setOptions([]);
  };

  const handleDeleteOption = (optionToDelete) => () => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((option) => option !== optionToDelete)
    );
  };

  const fetchTechs = async (query) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/tech?search=${query}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching techs:", error);
      return [];
    }
  };

  useEffect(() => {
    if (debouncedInput.trim()) {
      fetchTechs(debouncedInput).then((techs) => {
        setOptions(techs.map((tech) => tech.name));
      });
    } else {
      setOptions([]);
    }
  }, [debouncedInput]);

  const filterOptions = (event) => {
    setInput(event.target.value);
  };
  return (
    <>
      <Autocomplete
        className={`tech-stack-input ${customClass}`}
        value={input}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="React, Javascript, NodeJs etc"
            variant="outlined"
            onChange={filterOptions}
          />
        )}
        // onKeyDown={handleKeyDown}
        onChange={handleOptionClick}
      />
      <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}>
        {selectedOptions.map((option, index) => (
          <Chip
            color="primary"
            variant="outlined"
            key={index}
            label={option}
            onDelete={handleDeleteOption(option)}
            style={{ margin: "5px" }}
          />
        ))}
      </div>
      <Link target="_blank" to={"/add"}>
        Not able to see your Technology, Add?
      </Link>
    </>
  );
};
