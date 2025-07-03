import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getTypeStyle } from "../../utils/typeColors"; // <== importa a utilidade de cor

export default function PokemonCard({ name, image, types }) {
  // Tipo principal para definir a cor do card
  const mainType = types[0].type.name;
  const cardColor = getTypeStyle(mainType);

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: cardColor.backgroundColor,
        color: cardColor.color,
        borderRadius: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardMedia
        sx={{ height: 250, backgroundSize: "contain" }}
        image={image}
        title={name}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textTransform: "capitalize" }}
          >
            {name}
          </Typography>
        </Box>

        {/* Tipos como badges coloridas */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          {types.map((item, index) => {
            const typeName = item.type.name;
            const tagColor = getTypeStyle(typeName);

            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: tagColor.badgeColor,
                  color: tagColor.color,
                  px: 2,
                  py: 0.5,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
              >
                {typeName}
              </Box>
            );
          })}
        </Box>
      </CardContent>
      <CardActions />
    </Card>
  );
}
