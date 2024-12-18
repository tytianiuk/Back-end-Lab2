import express from 'express';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';
import { getAllUsers } from './controllers/userController.js';
import connectDatabase from './utils/db.js';

const server = express();
const PORT = 3000;

connectDatabase();

server.use(express.json());

server.use('/user', userRoutes).get('/users', getAllUsers);
server.use('/category', categoryRoutes);
server.use('/record', recordRoutes);
server.use('/currency', currencyRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
