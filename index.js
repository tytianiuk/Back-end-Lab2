import express from 'express';

const server = express();
const PORT = 3000;

app.use(express.json());

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
