const express = require("express");
const app = express();

const animals = [
  { id: 1, name: "Lion" },
  { id: 2, name: "Tiger" },
  { id: 3, name: "Elephant" },
  { id: 4, name: "Giraffe" },
  { id: 5, name: "Zebra" },
];

app.get("/animals", (req, res) => {
  res.json(animals);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("ANIMALS: ", animals);
