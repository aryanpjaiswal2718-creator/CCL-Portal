require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*'}));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'CCL Portal API' }));
app.use('/api', require('./routes/public'));
app.use('/api/admin', require('./routes/admin'));
const path = require('path');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))).catch(err => {
  console.error('Database connection failed:', err.message);
  process.exit(1);
});
