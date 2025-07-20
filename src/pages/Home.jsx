import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getTypeStyle } from "../utils/typeColors";
import FilterBar from "../components/Filterbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const Home = ({ setPokemonData }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false); // tema
  const navigate = useNavigate();

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f0fdd3",
      },
    },
  });

  const darkThemeObj = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#222",
      },
    },
  });

  useEffect(() => {
    getPokemonsByRegion(region);
  }, [region]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, type, sortBy]);

  const applyFilters = () => {
    let filtered = [...allPokemons];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((pokemon) => {
        const name = pokemon.data.name.toLowerCase();
        const id = pokemon.data.id.toString();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || id === term;
      });
    }

    if (type && type !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.data.types.some((t) => t.type.name === type)
      );
    }

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

  const pokemonPickHandler = (pokemonData) => {
    navigate("/profile", { state: { pokemonData } });
  };

  return (
    <ThemeProvider theme={darkMode ? darkThemeObj : lightTheme}>
      <CssBaseline />
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          borderRadius: 2,
          background: darkMode ? "#fff" : "#222",
          color: darkMode ? "#222" : "#fff",
          fontWeight: "bold",
        }}
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "Tema Claro" : "Tema Escuro"}
      </Button>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: darkMode ? "#222" : "#f0fdd3",
            py: 4,
          }}
        >
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
              src="/assets/pokedex.png"
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
              darkMode={darkMode} // Adiciona a prop para acompanhar o tema
            />
          </Box>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            backgroundColor: darkMode ? "#222" : "#f0fdd3",
          }}
        >
          <Grid container spacing={2}>
            {pokemons.map((pokemon, key) => {
              const data = pokemon.data;
              const mainType = data.types[0].type.name;
              const cardStyle = getTypeStyle(mainType);

              return (
                <Grid
                  item
                  xs={10}
                  md={2}
                  key={key}
                  sx={{ alignitems: "center" }}
                >
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
                      image={
                        data.sprites.other["official-artwork"].front_default
                      }
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
    </ThemeProvider>
  );
};
export default Home;
