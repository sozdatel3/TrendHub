const axios = require('axios');
require('dotenv').config();

async function getRepoByNameFromApi(nameOrId) {
    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
            q: `${nameOrId} in:name id`
        },
      });
      if (response.data.items.length > 0) {
        return response.data.items[0];
      } else {
        return null; // Репозиторий не найден
      }
    } catch (error) {
        console.error('Ошибка при запросе к GitHub API:', error);
    }
}


async function getTrendingRepositories(doWithResArray) {
    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: `stars:>${process.env.STARS_NUMBER}`, // Фильтр
          sort: 'stars',
          order: 'desc',
          per_page: `${process.env.MAX_REPO_NUMBER}`,
        },
      });
  
      doWithResArray(response.data.items);
      console.log('Синхронизация прошла успешно');
    } catch (error) {
      console.error('Ошибка при запросе к GitHub API:', error);
    }
  }
  
  module.exports = {
    getRepoByNameFromApi, getTrendingRepositories
  }