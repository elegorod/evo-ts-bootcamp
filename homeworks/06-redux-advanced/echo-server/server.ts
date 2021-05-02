import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Use POST /log to sent logs");
});

app.post("/log", (req, res) => {
  console.log(req.body);
  res.send("re")
});

app.listen(port, () => {
  console.debug(`Example app listening at http://localhost:${port}`);
});
