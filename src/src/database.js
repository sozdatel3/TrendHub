const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();


const baseHost = process.env.DB_HOST;
const basePort = process.env.DB_PORT;
const baseName = process.env.DB_NAME;
const baseUserName = process.env.DB_USER;
const basePassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(baseName, baseUserName, basePassword, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Порт PostgreSQL
});

const Repository = sequelize.define('Repository', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    html_url: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stargazers_count: {
      type: DataTypes.INTEGER,
    },
    language: {
      type: DataTypes.STRING,
    },
    has_issues: {
      type: DataTypes.BOOLEAN,
    },
    has_projects: {
      type: DataTypes.BOOLEAN,
    },
    has_downloads: {
      type: DataTypes.BOOLEAN,
    },
    has_wiki: {
      type: DataTypes.BOOLEAN,
    },
    has_pages: {
      type: DataTypes.BOOLEAN,
    },
    forks_count: {
      type: DataTypes.INTEGER,
    },
  });


 const addRepositoriesToDB = async function addRepositoriesToDatabase(data) {
    try {
      // Итерируемся по данным и добавляем каждый репозиторий в базу данных
      for (const repoData of data) {
        const existingRepo = await Repository.findOne({ where: { id: repoData.id } });
  
        if (existingRepo) {
          await existingRepo.update({
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
          });
        } else {
          await Repository.create({
            id: repoData.id,
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
          });
        }
      }
      console.log('Данные успешно добавлены в базу данных.');
    } catch (error) {
      console.error('Произошла ошибка при добавлении данных в базу данных:', error);
    }
  }

const takeRepo = async function (nameOrId) {
    const numberFromId = isNaN(Number(nameOrId)) ? -1 : Number(nameOrId);
    try {
        // Repository.findAll
        const repo = await Repository.findOne({
            // where: {
            //     [Sequelize.Op.or]: [
            //         { id: Number(nameOrId) },
            //         { name: nameOrId }
            //     ]
            // }
            where: 
                Sequelize.or(
                    { id: numberFromId },
                    { name: nameOrId }
                )
            });
        if (repo) {
            return repo;
        } else {
            return null; // Репозиторий не найден
        }
    } catch (error) {
        console.error('Ошибка при поиске репозитория:', error);
        throw error;
    }
}

async function findAllRepositories() {
    try {
        const repositories = await Repository.findAll();
        return repositories;
    } catch (error) {
        console.error('Ошибка при поиске репозиториев в базе данных:', error);
        throw error;
    }
}
// module.exports = addRepositoriesToDatabase;//addRepositoriesToDB;
// module.exports = Repository;
// module.exports = sequelize;
module.exports = {
    addRepositoriesToDB,
    Repository,
    sequelize,
    takeRepo,
    findAllRepositories,
};