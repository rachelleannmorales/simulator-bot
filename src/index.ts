import dotenv from 'dotenv';
dotenv.config();
const SimulatorController = require('./controllers/SimulatorController');

const app = new SimulatorController(process.env);

(async () => {
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();