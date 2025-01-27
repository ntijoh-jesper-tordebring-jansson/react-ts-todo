import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_HOST);  // Access environment variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from TypeScript!');
});

// Example POST route
app.post('/api/data', (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
