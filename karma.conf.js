// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'), // Make sure to have this plugin installed
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageIstanbulReporter: {
      // Change this line
      dir: require('path').join(__dirname, './coverage/ciri2'),
      subdir: '.',
      reports: ['html', 'lcovonly', 'text-summary'] // Add 'lcovonly' here
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'], // Add 'coverage-istanbul' here
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
