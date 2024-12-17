import express from 'express';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import { getAllUsers } from './controllers/userController.js';
import connectDatabase from './db.js';

const server = express();
const PORT = 3000;

connectDatabase();

server.use(express.json());

server.use('/user', userRoutes).get('/users', getAllUsers);
server.use('/category', categoryRoutes);
server.use('/record', recordRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
