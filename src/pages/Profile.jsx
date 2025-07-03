import React from "react";
import NavBar from "../components/NavBar";
import { Typography, Box, Container, Grid, Paper } from "@mui/material";
import typeColors from "../utils/typeColors";
import { getTypeStyle } from "../utils/typeColors";

import { useLocation } from "react-router-dom";
import PokemonTable from "../components/PokemonTable";

export const Profile = () => {
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;

  if (!pokemonData) {
    return <p>Pokémon não encontrado.</p>;
  }

  const { name, sprites } = pokemonData;

  return (
    <>
      <NavBar hideSearch />
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            m={"5"}
            padding={"4em"}
          >
            <Typography variant="h3" color={"black"}>
              {name}
            </Typography>
            <Box display={"flex"} m={2}>
              <Box
                component="img"
                src={sprites?.other?.["official-artwork"]?.front_default}
                marginRight={"2em"}
                width="30%"
                padding={"1em"}
              />
              <PokemonTable pokemonData={pokemonData} />
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", gap: 1 }}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {pokemonData.types.map((item, index) => {
              const typeName = item.type.name;
              const style = getTypeStyle(typeName);

              return (
                <Box
                  key={index}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "12px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    textTransform: "capitalize",
                    ...style,
                  }}
                >
                  {typeName}
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Container>
    </>
  );
};
