'use strict';

const gulp = require('gulp');
const chalk = require('chalk');
const notifier = require('node-notifier');
const templates = require('../templates/templates');
const options = require('./options');

module.exports = function (config, project, cb) {
	// No operation task (do nothing...)
	gulp.task('noop', done => {
		done();
	});

	// Default task: builds your app
	gulp.task('launch', () => {
		// Default task order
		let preTasks;
		let tasks = ['style', 'other'];
		let postTasks;
		let watchTasks;

		if (config.js.processor === 'webpack') {
			tasks.unshift('webpack');
		} else if (config.js.processor === 'typescript') {
			tasks.unshift('ts');
		} else {
			tasks.unshift('js');
		}

		// Theme roller support for sass or less files
		if ((config.css.language === 'sass' || config.css.language === 'less') &&
			(config.themeroller && config.themeroller.files.length > 0)) {
			tasks.unshift('themeroller');
		}

		// Don't do any task if the mode is basic
		if (config.mode === 'basic') {
			preTasks = ['noop'];
			tasks = ['noop'];
		} else {
			preTasks = ['clean'];
		}

		// Post Tasks, if there is no callback, execute browsersync
		if (typeof cb === 'function') {
			postTasks = ['noop'];
			watchTasks = ['noop'];
		} else {
			postTasks = ['browsersync'];
			watchTasks = ['watch'];
		}

		// Print the ascii logo
		console.log(chalk.magenta(templates.asciiLogo()));
		console.log(chalk.cyan(`is compiling`), chalk.cyan.bold(project), chalk.cyan('...'));

		// Run tasks
		gulp.series(
			gulp.parallel(preTasks),
			gulp.parallel(tasks),
			done => {
				console.log(chalk.cyan('...Done!'));

				if (typeof cb === 'function') {
					cb();
				} else {
					console.log(chalk.cyan('...Now'), chalk.cyan.bold('launching!'));
					console.log('Open up your favorite code editor and modify any file in:');
					console.log(chalk.italic(config.srcFolder));
					console.log('All files in there will sync to your APEX app.');
					notifier.notify(options.notifyLaunch());
				}

				done();
			},
			gulp.parallel(postTasks),
			gulp.parallel(watchTasks)
		)();
	});
};
