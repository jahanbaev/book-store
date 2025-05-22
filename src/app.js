import express from 'express';
import fs from 'fs';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import adminRoutes from './routes/admin.routes.js';

import './models/init.js';
import './strategies/jwt.js';

dotenv.config();

const swaggerDoc = JSON.parse(fs.readFileSync(new URL('../docs/swagger.json', import.meta.url)));

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.static('public'));
export default app;
