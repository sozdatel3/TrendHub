const {getTrendingRepositories} = require('./apiWork')
const {addRepositoriesToDB, Repository, sequelize}  = require('./database')
let {app, syncIntervalId, syncInterval} = require('./server')
const {loggerProcess} = require('./logger');
const program = require('./cli')
const readline = require('readline');
const { exit } = require('process');

const port = process.env.PORT || 4000;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
app.listen(port, () => {
    loggerProcess.info(`Сервер запущен на порту ${port}`)
  });

Repository.sync();

getTrendingRepositories(addRepositoriesToDB);

// Запуск синхронизации
syncIntervalId = setInterval(() => {
  getTrendingRepositories(addRepositoriesToDB)}, syncInterval)

function processCommand() {
  rl.question('Please enter (help , sync, allRepo, findRepo, exit): ', async (command) => {
    if (command === 'exit') {
      exit();

    }
    if (command == 'sync' || command == 'allRepo' || command == 'help' || command.startsWith('findRepo')) {
      const [cmd, ...args] = command.split(' '); // Разделяем команду и аргументы
      program.parse(['node', 'index', cmd, ...args]);
    }
    else { 
      console.log('Wrong command. Please enter: help, sync, allRepo или findRepo.');
    }
    setTimeout(processCommand, 100);
  });
}

processCommand();