import React from "react";
import { Box, Typography, Grid, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

export default function PokemonTable({ pokemonData }) {
  const { height, weight, category, abilities, types } = pokemonData;

  return (
    <Box
      sx={{
        backgroundColor: "#ff3b30",
        borderRadius: "10px",
        padding: "16px",
        width: "100%",
        maxWidth: 400,
        color: "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2">Altura</Typography>
          <Typography variant="h6" sx={{ color: "#000" }}>
            {height} m
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Categoria</Typography>
          <Typography variant="h6" sx={{ color: "#000" }}>
            {category || "Seed"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Peso</Typography>
          <Typography variant="h6" sx={{ color: "#000" }}>
            {weight} kg
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Habilidades</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {abilities.map((item, index) => (
              <Typography variant="h6" color="black" key={index}>
                {item.ability.name}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">Sexo</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <MaleIcon sx={{ color: "#000" }} />
            <FemaleIcon sx={{ color: "#000" }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
