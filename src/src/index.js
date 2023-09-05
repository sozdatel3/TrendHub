const axios = require('axios');
require('dotenv').config();
const {addRepositoriesToDB, Repository, sequelize}  = require('./database')
Repository.sync();


async function getTrendingRepositories() {
  try {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: `stars:>${process.env.STARS_NUMBER}`, // Фильтр
        sort: 'stars',    // Сортировка
        order: 'desc',    // Порядок сортировки
        per_page: `${process.env.MAX_REPO_NUMBER}`,
      },
    });

    addRepositoriesToDB(response.data.items).catch(error => {
        console.error('Ошибка при добавление в базу данных:', error);
    });
  } catch (error) {
    console.error('Ошибка при запросе к GitHub API:', error);
  }
}

getTrendingRepositories();