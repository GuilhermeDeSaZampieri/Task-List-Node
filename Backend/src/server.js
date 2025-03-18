
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3333;

//definindo a porta
app.listen(PORT, () => console.log(`Server running or port ${PORT}`));
