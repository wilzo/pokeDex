import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";

const FilterBar = ({
  onRegionChange,
  onTypeChange,
  onSortChange,
  onSearchChange,
  darkMode, // recebe a prop
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        p: 5,
        backgroundColor: darkMode ? "#333" : "#f0fdd3", // muda cor conforme tema
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <TextField
        label="Região"
        select
        size="small"
        onChange={onRegionChange}
        defaultValue="kanto"
        sx={{
          backgroundColor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 1,
        }}
        InputLabelProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
        InputProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
      >
        <MenuItem value="kanto">Kanto (001–151)</MenuItem>
        <MenuItem value="johto">Johto (152–251)</MenuItem>
        <MenuItem value="hoenn">Hoenn (252–386)</MenuItem>
        <MenuItem value="sinnoh">Sinnoh (387–493)</MenuItem>
        <MenuItem value="unova">Unova (494–649)</MenuItem>
        <MenuItem value="kalos">Kalos (650–721)</MenuItem>
        <MenuItem value="alola">Alola (722–809)</MenuItem>
        <MenuItem value="galar">Galar (810–898)</MenuItem>
        <MenuItem value="paldea">Paldea (899–1010)</MenuItem>
      </TextField>

      <TextField
        label="Tipo"
        select
        size="small"
        onChange={onTypeChange}
        defaultValue="all"
        sx={{
          backgroundColor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 1,
        }}
        InputLabelProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
        InputProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
      >
        <MenuItem value="all">Todos</MenuItem>
        <MenuItem value="fire">Fogo</MenuItem>
        <MenuItem value="water">Água</MenuItem>
        <MenuItem value="grass">Grama</MenuItem>
        <MenuItem value="electric">Elétrico</MenuItem>
        {/* Adicione outros tipos */}
      </TextField>

      <TextField
        label="Ordenar por"
        select
        size="small"
        onChange={onSortChange}
        defaultValue="id"
        sx={{
          backgroundColor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 1,
        }}
        InputLabelProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
        InputProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
      >
        <MenuItem value="id">ID</MenuItem>
        <MenuItem value="name">Nome</MenuItem>
      </TextField>

      <TextField
        label="Pesquisar"
        variant="outlined"
        size="small"
        onChange={onSearchChange}
        sx={{
          backgroundColor: darkMode ? "#222" : "#fff",
          color: darkMode ? "#fff" : "#222",
          borderRadius: 1,
        }}
        InputLabelProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
        InputProps={{
          style: { color: darkMode ? "#fff" : "#222" },
        }}
      />
    </Box>
  );
};

export default FilterBar;
