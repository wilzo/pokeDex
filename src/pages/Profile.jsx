/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import NavBar from "../components/NavBar";
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { getTypeStyle } from "../utils/typeColors";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Profile = () => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;

  const [speciesData, setSpeciesData] = useState(null);

  if (!pokemonData) return <p>Pokémon não encontrado.</p>;

  const {
    name,
    sprites,
    id,
    types,
    height,
    weight,
    abilities,
    base_experience,
    stats,
  } = pokemonData;

  const description =
    speciesData?.flavor_text_entries?.find(
      (entry) => entry.language.name === "pt"
    )?.flavor_text ||
    speciesData?.flavor_text_entries?.find(
      (entry) => entry.language.name === "en"
    )?.flavor_text ||
    "Descrição não disponível.";
  useEffect(() => {
    if (!pokemonData?.species?.url) return;

    const fetchData = async () => {
      try {
        const speciesRes = await axios.get(pokemonData.species.url);
        setSpeciesData(speciesRes.data);

        const evolutionRes = await axios.get(
          speciesRes.data.evolution_chain.url
        );
        const evolutions = [];
        let evo = evolutionRes.data.chain;

        do {
          evolutions.push(evo.species.name);
          evo = evo.evolves_to[0];
        } while (evo && evo.hasOwnProperty("evolves_to"));

        const evolutionData = await Promise.all(
          evolutions.map((name) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          )
        );

        setEvolutionChain(evolutionData.map((res) => res.data));
      } catch (err) {
        console.error("Erro ao buscar dados do Pokémon:", err);
      }
    };

    fetchData();
  }, [pokemonData]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f0fdd3",
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 2,
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
      </Box>
      <div>
        <Box sx={{ backgroundColor: "#f0fdd3" }}>
          <Container maxWidth="md" sx={{ p: 10 }}>
            <Paper
              elevation={5}
              sx={{
                borderRadius: 4,
                background: "linear-gradient(to bottom, #c0f8c1, #d8b4f8)",
                p: 4,
                fontFamily: "monospace",
              }}
            >
              {/* Header do card */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    #{String(id).padStart(3, "0")}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    textTransform="capitalize"
                  >
                    {name}
                  </Typography>

                  {/* Tipo(s) */}
                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    {types.map((t, idx) => {
                      const style = getTypeStyle(t.type.name);
                      return (
                        <Box
                          key={idx}
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "12px",
                            fontSize: "14px",
                            color: "#fff",
                            textTransform: "capitalize",
                            ...style,
                          }}
                        >
                          {t.type.name}
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Imagem */}
                  <Box
                    component="img"
                    src={sprites?.other?.["official-artwork"]?.front_default}
                    alt={name}
                    sx={{ width: "100%", maxWidth: 150, mt: 2 }}
                  />

                  {/* Altura e peso */}
                  <Typography sx={{ mt: 2 }}>
                    <strong>Altura:</strong> {height / 10} m
                  </Typography>
                  <Typography>
                    <strong>Peso:</strong> {weight / 10} kg
                  </Typography>
                  <Typography>
                    <strong>Experiencia:</strong> {base_experience}
                  </Typography>
                </Grid>

                {/* Informações à direita */}
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Sobre
                    </Typography>
                    <Typography>{description}</Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Habilidades
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {abilities.map((a, i) => (
                        <Typography key={i}>• {a.ability.name}</Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Stats */}
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      Base de Status
                    </Typography>
                    <Grid container spacing={1}>
                      {stats.map((s, i) => (
                        <Grid item xs={6} sm={4} key={i}>
                          <Typography
                            sx={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            {s.stat.name.toUpperCase()}
                          </Typography>
                          <Typography>{s.base_stat}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Evolução */}
                  {evolutionChain.length > 1 && (
                    <Box sx={{ mt: 4 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ mb: 2, fontFamily: "monospace" }}
                        align="center"
                      >
                        Evolution
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={3}
                      >
                        {evolutionChain.map((evo, index) => (
                          <React.Fragment key={evo.id}>
                            <Box
                              onClick={() =>
                                navigate("/profile", {
                                  state: { pokemonData: evo },
                                })
                              }
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src={
                                  evo.sprites.other["official-artwork"]
                                    .front_default
                                }
                                alt={evo.name}
                                sx={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: "50%",
                                  boxShadow: 3,
                                  background: "#fff",
                                  p: 1,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontFamily: "monospace",
                                  textTransform: "capitalize",
                                  mt: 1,
                                }}
                              >
                                {evo.name}
                              </Typography>
                            </Box>

                            {/* Adiciona a seta exceto no último */}
                            {index !== evolutionChain.length - 1 && (
                              <Typography fontSize="2rem" fontWeight="bold">
                                →
                              </Typography>
                            )}
                          </React.Fragment>
                        ))}
                        <Box textAlign="center" mt={4}>
                          <button
                            onClick={() => navigate("/")}
                            style={{
                              padding: "10px 20px",
                              fontSize: "16px",
                              fontWeight: "bold",
                              borderRadius: "10px",
                              backgroundColor: "#ff5555",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Voltar para Home
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </div>
    </>
  );
};
