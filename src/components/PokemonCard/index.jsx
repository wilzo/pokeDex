import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PokemonCard({ name, image, types }) {
  const typesPokemons = () => {
    if (types[1]) {
      return types[0].type.name + " | " + types[1].type.name;
    }
    return types[0].type.name;
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 250 }} image={image} title="green iguana" />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {typesPokemons()}
          </Typography>
        </Box>
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
