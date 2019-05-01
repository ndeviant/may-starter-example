/**
 * Error, warning, info logger
 */
const log = require("fancy-log");
const PluginError = require("plugin-error");
const c = require("ansi-colors");

class Log {
	constructor(taskName, message) {
		this.taskName = taskName;
		this.message = message;
	}

	error = function error() {
		throw new PluginError({
			plugin: this.taskName,
			message: c.red(this.message),
		});
	};

	info = function info() {
		log(this.taskName, c.magenta(this.message));
	};
}

module.exports = Log;
