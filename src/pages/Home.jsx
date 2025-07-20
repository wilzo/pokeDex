import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getTypeStyle } from "../utils/typeColors";
import FilterBar from "../components/Filterbar";

export const Home = ({ setPokemonData }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonsByRegion(region);
  }, [region]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, type, sortBy]);

  const applyFilters = () => {
    let filtered = [...allPokemons];

    // Filtro por nome ou ID
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((pokemon) => {
        const name = pokemon.data.name.toLowerCase();
        const id = pokemon.data.id.toString();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || id === term;
      });
    }

    // Filtro por tipo
    if (type && type !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.data.types.some((t) => t.type.name === type)
      );
    }

    // Ordenação
    if (sortBy === "name") {
      filtered.sort((a, b) => a.data.name.localeCompare(b.data.name));
    } else if (sortBy === "id") {
      filtered.sort((a, b) => a.data.id - b.data.id);
    }

    setPokemons(filtered);
  };

  const getPokemonsByRegion = (region) => {
    let start = 1;
    let end = 151;

    switch (region) {
      case "johto":
        start = 152;
        end = 251;
        break;
      case "hoenn":
        start = 252;
        end = 386;
        break;
      case "sinnoh":
        start = 387;
        end = 493;
        break;
      case "unova":
        start = 494;
        end = 649;
        break;
      case "kalos":
        start = 650;
        end = 721;
        break;
      case "alola":
        start = 722;
        end = 809;
        break;
      case "galar":
        start = 810;
        end = 898;
        break;
      case "paldea":
        start = 899;
        end = 1010;
        break;
      default:
        start = 1;
        end = 151;
        break;
    }

    const endpoints = [];
    for (let i = start; i <= end; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setAllPokemons(res);
        setPokemons(res);
      })
      .catch((error) => console.error("Erro ao carregar pokémons:", error));
  };

  const pokemonFilter = (value) => {
    setSearchTerm(value); // deixa o filtro automático via useEffect
  };

  const pokemonPickHandler = (pokemonData) => {
    navigate("/profile", { state: { pokemonData } });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f0fdd3",
          py: 4,
        }}
      >
        {/* Imagem grande da Pokédex */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/assets/pokedex.png" // substitua pelo nome correto
            alt="Pokédex"
            sx={{
              maxWidth: "120px",
              width: "40%",
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "red",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px black",
            }}
          >
            Pokédex Wilzo
          </Typography>
        </Box>

        {/* Filtros */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <FilterBar
            onRegionChange={(e) => setRegion(e.target.value)}
            onTypeChange={(e) => setType(e.target.value)}
            onSortChange={(e) => setSortBy(e.target.value)}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#f0fdd3",
        }}
      >
        <Grid container spacing={2}>
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
                    style={cardStyle}
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
