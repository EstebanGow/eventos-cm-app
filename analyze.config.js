const scanner = require('sonarqube-scanner');
scanner({
    serverUrl: 'https://api.coordinadora.com/sonar/',
    options: {
        'sonar.projectVersion': '1.1.0',
        'sonar.sources': 'src',
        'sonar.tests': 'test',
        'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
        'sonar.test.inclusions': 'test/**/*.test.ts',
    },
});
