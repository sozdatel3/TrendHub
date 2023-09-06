
const {getTrendingRepositories} = require('./apiWork')
const {addRepositoriesToDB, Repository, sequelize}  = require('./database')
let {app, syncIntervalId, syncInterval} = require('./server')
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });

Repository.sync();

getTrendingRepositories(addRepositoriesToDB);

// Запуск синхронизации
syncIntervalId = setInterval(() => getTrendingRepositories(addRepositoriesToDB), syncInterval)
