import express from 'express';
import cors from 'cors';

import { router } from './src/routes/index.js';

const app = express();

// Parse body
app.use(express.json())
// Enable CORS, since frontend is ran through dev server
app.use(cors());
// Import all routes
app.use('/', router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
