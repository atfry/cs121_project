const { sequelize } = require('sequelize');
const main = async () => {
  await sequelize.sync({ force: true });
  process.exit();
};

main();