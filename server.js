const { app } = require('./app');
const { port } = require('./helpers');

// eslint-disable-next-line no-console
app.listen(port(), console.log(`Listening on port ${port()}...`));
