const typeStyles = {
  normal: {
    backgroundColor: "#A8A77A",
    color: "#fff",
    badgeColor: "#6D6D4E",
  },
  fire: {
    backgroundColor: "#EE8130",
    color: "#fff",
    badgeColor: "#9C3E00",
  },
  water: {
    backgroundColor: "#6390F0",
    color: "#fff",
    badgeColor: "#1B3B9C",
  },
  electric: {
    backgroundColor: "#F7D02C",
    color: "#000",
    badgeColor: "#B79300",
  },
  grass: {
    backgroundColor: "#7AC74C",
    color: "#fff",
    badgeColor: "#3A7525",
  },
  ice: {
    backgroundColor: "#96D9D6",
    color: "#000",
    badgeColor: "#3BA3A0",
  },
  fighting: {
    backgroundColor: "#C22E28",
    color: "#fff",
    badgeColor: "#6B1C1A",
  },
  poison: {
    backgroundColor: "#A33EA1",
    color: "#fff",
    badgeColor: "#5B1A57",
  },
  ground: {
    backgroundColor: "#E2BF65",
    color: "#000",
    badgeColor: "#927126",
  },
  flying: {
    backgroundColor: "#A98FF3",
    color: "#000",
    badgeColor: "#4D3B9F",
  },
  psychic: {
    backgroundColor: "#F95587",
    color: "#fff",
    badgeColor: "#9C2853",
  },
  bug: {
    backgroundColor: "#A6B91A",
    color: "#000",
    badgeColor: "#4E5B00",
  },
  rock: {
    backgroundColor: "#B6A136",
    color: "#fff",
    badgeColor: "#5D4B11",
  },
  ghost: {
    backgroundColor: "#735797",
    color: "#fff",
    badgeColor: "#3C2B4F",
  },
  dragon: {
    backgroundColor: "#6F35FC",
    color: "#fff",
    badgeColor: "#311993",
  },
  dark: {
    backgroundColor: "#705746",
    color: "#fff",
    badgeColor: "#2F1E10",
  },
  steel: {
    backgroundColor: "#B7B7CE",
    color: "#000",
    badgeColor: "#595972",
  },
  fairy: {
    backgroundColor: "#D685AD",
    color: "#000",
    badgeColor: "#914E6C",
  },
};

export const getTypeStyle = (type) =>
  typeStyles[type] || {
    backgroundColor: "#ccc",
    color: "#000",
    badgeColor: "#888",
  };
