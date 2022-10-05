const { MicrogenClient } = require("microgen-v3-sdk");

const microgen = new MicrogenClient({
  apiKey: process.env.MICROGEN_API_KEY,
  url: process.env.MICROGEN_URL,
});

export default microgen;
