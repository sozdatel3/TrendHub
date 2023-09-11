const { Command } = require('commander');
const program = new Command();
const axios = require('axios');
const port = process.env.PORT || 4000;

program
  .command('sync')
  .description('Синхронизация трендовых репозиториев')
  .action(async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/sync`);
      console.log(response.data);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  });

program
  .command('allRepo')
  .description('Вывод всех репозиториев')
  .option("-n --number <value>", 'Вывести первые N репозиториев')
  .action(async (options) => {
    try {
      const response = await axios.get(`http://localhost:${port}/repositories`);
      const repositories = response.data;
      
      if (options.number) {
        const n = parseInt(options.number);
        for (let i = 0; i < n && i < repositories.length; i++) {
          console.log(`Repository number: ${i + 1} :\n`);
          console.log(repositories[i]);
        }
      } else {
        for (let i = 0; i < repositories.length; i++) {
          console.log(`Repository number: ${i + 1} :\n`);
          console.log(repositories[i]);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  });


  program
  .command('findRepo')
  .argument('[nameOrId]', 'Name or Id of searching repo')
  .description('Поиск репозитория по имени или id')
  .action(async (nameOrId) => {
    if (nameOrId == undefined) {
      console.error('A mandatory argument is missing. Use the command as follows: findRepo <nameOrId>');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:${port}/repositories/${nameOrId}`);
      console.log(response.data);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  });

  program
  .command('help')
  .description('Вывести справку о доступных командах')
  .action(() => {
    program.outputHelp();
  });
  
  module.exports = program;