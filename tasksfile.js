const {sh, cli} = require('tasksfile');

function hello(options, name = 'Mysterious') {
    console.log(`Hello ${name}!`);
}

function e2e_setup_db() {
    var defaultE2eDBName = 'hungknow-mysql-e2e';

    console.log(`Running ${defaultE2eDBName}`);
    var dockerPs = sh('docker ps -a', {
        silent: true,
    });

    var dockerPsLines = dockerPs.split(/\r?\n/);
    var mysqlResults = dockerPsLines.filter((it) => it.indexOf(defaultE2eDBName) >= 0);

    if (mysqlResults.length > 0) {
        console.log(`Restarting ${defaultE2eDBName}`);
        sh(`docker start ${defaultE2eDBName}`);
    } else {
        console.log('Starting hungknow-mysql-e2e');
        sh(
            `docker run --name ${defaultE2eDBName} -p 7306:3306 -e MYSQL_ROOT_PASSWORD=mostest -e MYSQL_USER=hkuser -e MYSQL_PASSWORD=mostest -e MYSQL_DATABASE=hungknow_test -d mysql:5.7`,
        );
    }
}

cli({
    hello,
    e2e_setup_db,
});
