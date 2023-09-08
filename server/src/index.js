const {getTrendingRepositories} = require('./apiWork')
const {addRepositoriesToDB, Repository, sequelize}  = require('./database')
let {app, syncIntervalId, syncInterval, lastSyncTime} = require('./server')
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
    // console.log();
    loggerProcess.info(`Сервер запущен на порту ${port}`)
  });

Repository.sync();

lastSyncTime = new Date();
getTrendingRepositories(addRepositoriesToDB);

// Запуск синхронизации
syncIntervalId = setInterval(() => {lastSyncTime = new Date();
  getTrendingRepositories(addRepositoriesToDB)}, syncInterval)

// rl.question('Введите команду (sync, allRepo, findRepo): ', (command) => {
//     program.parse([process.argv[0], process.argv[1], command]);
//     rl.close();
// });

function processCommand() {
  rl.question('Введите команду (help , sync, allRepo, findRepo, exit): ', async (command) => {
    if (command === 'exit') {
      exit();
      // rl.close();
      // return;
    }
    if (command == 'sync' || command == 'allRepo' || command == 'help' || command.startsWith('findRepo')) {
      const [cmd, ...args] = command.split(' '); // Разделяем команду и аргументы
      program.parse(['node', 'index', cmd, ...args]);
    }
    else { 
      console.log('Неправильная команда. Пожалуйста, введите help, sync, allRepo или findRepo.');
    }
    setTimeout(processCommand, 100);
    // Возобновляем прослушивание stdin
  });
}

processCommand();