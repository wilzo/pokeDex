import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const navigation = useNavigate();
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
    setPokemonData(pokemonData);
    navigation("/profile");
  };

  return (
    <div>
      <NavBar pokemonFilter={pokemonFilter} />
      <Container maxwidth="false">
        <Grid container spacing={3}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={12} md={3} key={key}>
              <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                <PokemonCard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                ></PokemonCard>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
