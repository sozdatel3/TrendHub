const {getTrendingRepositories} = require('./apiWork')
const {addRepositoriesToDB, Repository, sequelize}  = require('./database')
let {app, syncIntervalId, syncInterval} = require('./server')
const {loggerProcess} = require('./logger');
const program = require('./cli')
const readline = require('readline');

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

getTrendingRepositories(addRepositoriesToDB);

// Запуск синхронизации
syncIntervalId = setInterval(() => getTrendingRepositories(addRepositoriesToDB), syncInterval)

// rl.question('Введите команду (sync, allRepo, findRepo): ', (command) => {
//     program.parse([process.argv[0], process.argv[1], command]);
//     rl.close();
// });

function processCommand() {
  rl.question('Введите команду (sync, allRepo, findRepo): ', async (command) => {
    if (command === 'exit') {
      rl.close();
      return;
    }
    switch (command) {
      case 'sync':
      case 'allRepo':
      case 'findRepo':
        program.parse([process.argv[0], process.argv[1], command]);
        break;
      default:
        console.log('Неправильная команда. Пожалуйста, введите sync, allRepo или findRepo.');
    }
    processCommand(); // Возобновляем прослушивание stdin
  });
}

processCommand(); 