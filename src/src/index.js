
const {getTrendingRepositories} = require('./apiWork')
const {addRepositoriesToDB, Repository, sequelize}  = require('./database')
const app = require('./server')
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });

Repository.sync();



getTrendingRepositories(addRepositoriesToDB);
//addRepositoriesToDB(response.data.items).catch(error => {
    //    console.error('Ошибка при добавление в базу данных:', error);
    //});