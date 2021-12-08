
const app = require("./app");
const apiRoutes = require("./Routes/APIRoutes");
const config = require('./Config/Config');

app.set('port', config.mainapi.port || 3000);
app.use(apiRoutes);

app.listen(config.mainapi.port , () => {
    console.log(`CleanApp is running on port ${config.mainapi.port}`);
});