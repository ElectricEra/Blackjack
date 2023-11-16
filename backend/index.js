import express from 'express';
import cors from 'cors';

import { router } from './src/routes/index.js';

const app = express();

// Enable CORS, since frontend is ran through da ev server
app.use(cors());
// Import all routes
app.use('/', router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
