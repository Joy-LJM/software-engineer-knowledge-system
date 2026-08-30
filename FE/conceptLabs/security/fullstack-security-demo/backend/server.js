const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend's URL
  }),
);
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
