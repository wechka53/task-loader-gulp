import path from 'path';
import globby from 'globby';
import { argv } from 'yargs'
import gulpLoadPlugin from 'gulp-load-plugins';

export default (gulp, options, plugins) => {
    let pattern;
    let cwd = process.cwd();

    options = options || {};

    options.cwd = options.cwd || cwd;
    pattern = options.pattern = options.pattern || 'tasks/**/*.js';

    options.argv = options.argv || argv;

    plugins = plugins || gulpLoadPlugin({
            config: path.join(cwd, 'package.json')
        });

    globby.sync(pattern).forEach(function (file) {
        let taskConfig = require(path.join(cwd, file)).default;

        if (typeof taskConfig === 'function') {
            taskConfig(gulp, options, plugins);
        }
    });
};