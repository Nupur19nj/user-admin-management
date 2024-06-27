import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`Nupur's Server is running at port ${PORT}`);
});
