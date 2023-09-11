const axios = require('axios');
require('dotenv').config();
const {loggerProcess, loggerError} = require('./logger');

async function getRepoByNameFromApi(nameOrId) {
    try {
      const response = await axios.get('https://api.github.com/search/repositories', {
        params: {
            q: `${nameOrId} in:name id`
        },
      });
      if (response.data.items.length > 0) {
        return response.data.items;
      } else {
        return null; // Репозиторий не найден
      }
    } catch (error) {
        loggerError.error('Ошибка при запросе к GitHub API:', error);
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
      loggerProcess.info('Синхронизация прошла успешно');
    } catch (error) {
      loggerError.error('Ошибка при запросе к GitHub API:', error);
    }
  }
  
  function formatRepoFromApi (repoData) {
    
    if (repoData.length > 0) {
    return outputArray = repoData.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      has_issues: repo.has_issues,
      has_projects: repo.has_projects,
      has_downloads: repo.has_downloads,
      has_wiki: repo.has_wiki,
      has_pages: repo.has_pages,
      forks_count: repo.forks_count,
    }))
    } else {
      return [{ id: repoData.id,
    name: repoData.name,
    full_name: repoData.full_name,
    html_url: repoData.html_url,
    description: repoData.description,
    stargazers_count: repoData.stargazers_count,
    language: repoData.language,
    has_issues: repoData.has_issues,
    has_projects: repoData.has_projects,
    has_downloads: repoData.has_downloads,
    has_wiki: repoData.has_wiki,
    has_pages: repoData.has_pages,
    forks_count: repoData.forks_count,
    }]
    }
  };
  
  module.exports = {
    getRepoByNameFromApi, getTrendingRepositories, formatRepoFromApi
  }