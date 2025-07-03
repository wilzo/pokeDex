import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getTypeStyle } from "../utils/typeColors";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getPokemons();
  }, []);
  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 151; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    var response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
    return response;
  };

  const pokemonFilter = (name) => {
    if (name.trim() === "") {
      getPokemons();
      return;
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.data.name.toLowerCase().includes(name.toLowerCase())
    );

    setPokemons(filteredPokemons);
  };

  const pokemonPickHandler = (pokemonData) => {
    navigate("/profile", { state: { pokemonData } });
  };

  return (
    <div>
      <NavBar pokemonFilter={pokemonFilter} />
      <Container maxwidth="false">
        <Grid container spacing={2} marginTop="4EM">
          {pokemons.map((pokemon, key) => {
            const data = pokemon.data;
            const mainType = data.types[0].type.name;
            const cardStyle = getTypeStyle(mainType);

            return (
              <Grid item xs={12} md={3} key={key}>
                <Box
                  onClick={() => pokemonPickHandler(data)}
                  sx={{
                    backgroundColor: cardStyle.backgroundColor,
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <PokemonCard
                    name={data.name}
                    image={data.sprites.other["official-artwork"].front_default}
                    types={data.types}
                    style={cardStyle} // repasse todo o estilo para o Card
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
