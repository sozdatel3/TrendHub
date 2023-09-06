const express = require('express');
const {addRepositoriesToDB,  Repository, takeRepo, findAllRepositories} = require('./database')
const {getRepoByNameFromApi, getTrendingRepositories} = require('./apiWork')
const app = express();

  // Получение всех репозиториев
  app.get('/repositories', (req, res) => {
    findAllRepositories()
    .then((repository) => {
      res.json(repository); // Этот код выполняется, когда промис разрешится.
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Произошла ошибка' });
    });
  });
  

// Получение репозитория по имени или ID
app.get('/repositories/:nameOrId', (req, res) => {
    const nameOrId = req.params.nameOrId;
    const findInDb = true;
    // try {
      takeRepo(nameOrId).then((repository) => {if (repository == null) {
        getRepoByNameFromApi(nameOrId).then((repo) => { 
            if (repo != null) {
                const message = 'Репозиторий не найден в трендовых репозиториях, но существует на gitHub'; ///TODO сделай красивую обработку
                res.json({message, repo});
            } else {
                const cantFind = 'Такого репозитория не существует';
                res.json(cantFind);
            }
        })
        .catch((error) => {
            console.error('Произошла ошибка:', error);
            res.status(500).json({ error: 'Произошла ошибка' });
        });
      } else { res.json(repository);}})
      .catch((error) => {
        console.error('Произошла ошибка:', error);
        res.status(500).json({ error: 'Произошла ошибка' });
      })})
  

  // Начать синхронизацию с GitHub
  app.post('/sync', (req, res) => {
    try {
        getTrendingRepositories(addRepositoriesToDB);
        Repository.sync();
        res.status(200);
        /// TODO сбросить основную синхронизацию
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(500).json({ error: 'Произошла ошибка' });
    }
  });
  
  module.exports = app;
