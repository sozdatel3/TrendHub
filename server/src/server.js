const express = require('express');
const {addRepositoriesToDB,  Repository, takeRepo, findAllRepositories} = require('./database')
const {getRepoByNameFromApi, getTrendingRepositories, formatRepoFromApi} = require('./apiWork')
const {loggerError} = require('./logger');

const app = express();
let lastSyncTime = new Date();
// Разрешение доступа со всех источников
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); //TODO change private policy*/

let syncIntervalId;
const syncInterval = process.env.UPDATE_TIME * 60 * 1000; // 10 минут в миллисекундах
  
// Получение всех репозиториев
  app.get('/repositories', (req, res) => {
    findAllRepositories()
    .then((repository) => {
      res.json(repository); // Этот код выполняется, когда промис разрешится.
    })
    .catch((error) => {
      loggerError.info('Произошла ошибка:', error);
      res.status(500).json({ error: 'Произошла ошибка' });
    });
  });
  

// Получение репозитория по имени или ID
app.get('/repositories/:nameOrId', (req, res) => {
    const nameOrId = req.params.nameOrId;
      takeRepo(nameOrId).then((repository) => {if (repository == null) {
        getRepoByNameFromApi(nameOrId).then((repo) => { 
            if (repo != null) {
                const message = 'Репозиторий не найден в трендовых репозиториях, но существует на gitHub'; ///TODO сделай красивую обработку
                const newRepo = formatRepoFromApi(repo);
                res.json({message, newRepo} );
            } else {
                const cantFind = 'Такого репозитория не существует';
                res.json(cantFind);
            }
        })
        .catch((error) => {
            loggerError.info('Произошла ошибка:', error);
            res.status(500).json({ error: 'Произошла ошибка' });
        });
      } else { 
        const message = 'Репозиторий найден в трендовых репозиториях';
        const newRepo = repository;
        res.json({message, newRepo});}})
      .catch((error) => {
        loggerError.info('Произошла ошибка:', error);
        res.status(500).json({ error: 'Произошла ошибка' });
      })})
  

  // Начать синхронизацию с GitHub
  app.get('/sync', (req, res) => {
    try {
        getTrendingRepositories(addRepositoriesToDB);
        lastSyncTime = new Date();
        if (syncIntervalId) {
            clearInterval(syncIntervalId);
          }
          // новый интервал синхронизации
          syncIntervalId = setInterval(() => getTrendingRepositories(addRepositoriesToDB), syncInterval);

        res.status(200).json('Синхронизация прошла успешно');
    } catch (error) {
        loggerError.info('Произошла ошибка:', error);
        res.status(500).json({ error: 'Произошла ошибка' });
    }
  });

  // app.get('/last-update', (req, res) => {
  //   res.json(lastSyncTime);
  // });

  module.exports = {app, syncIntervalId, syncInterval, lastSyncTime};
