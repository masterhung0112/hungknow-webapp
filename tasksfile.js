const { sh, cli  } = require('tasksfile')
var shell = require('shelljs');
shell.config.silent = false

require('dotenv').config()

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

function build_docker_image(_, tag) {
    if (!tag) {
        console.error('tag argument is required')
        return
    }
    sh(`docker build -m 8g -f build/Dockerfile.nextjs -t hungknow/webapp:${tag} .`, {nopipe: true})
}

function push_docker_image(_, tag) {
    if (process.env.DOCKER_PASSWORD == '' || process.env.DOCKER_USERNAME == '') {
      console.error('DOCKER_USERNAME and DOCKER_PASSWORD are required in env file')
      return
    }
    const loginResult = shell.exec(`docker login --username ${process.env.DOCKER_USERNAME} --password ${process.env.DOCKER_PASSWORD}`)
    if (loginResult.code === 0) {
      shell.exec(`docker push hungknow/webapp:${tag}`)
    }
  }

cli({
    hello,
    e2e_setup_db,
    build_docker_image,
    push_docker_image,
});
