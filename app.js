const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const colors = require('colors');

const mountRoutes = require('./routes');

const { logErrors, errorHandler } = require('./middleware/errorMiddleware');

const { initializeTables } = require('./scripts/createTables');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`request path: ${req.path.cyan}`);
  console.log(`request method: ${req.method.cyan}`);
  next();
});

mountRoutes(app);

app.use(logErrors);
app.use(errorHandler);

initializeTables()
  .then(() => {
    app.listen(port, () => {
      console.log(colors.green('Server is running on port', port));
    });
  })
  .catch((err) => {
    console.error(colors.red('Error:', err));
    process.exit(-1);
  });
