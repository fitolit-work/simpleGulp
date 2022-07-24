import webpack from 'webpack-stream';

export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemaps: true})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(webpack({ // подключение webpack
            mode: 'development', // режим разработки
            output: {
                filename: 'app.min.js', // создаст этот файл и все соберет туда?
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js)) // выгрузит собранный файл сюда
}