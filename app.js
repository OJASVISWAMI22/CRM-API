const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/lead_route');
const errorHandler = require('./middleware/error');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// midlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/leads', leadRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;