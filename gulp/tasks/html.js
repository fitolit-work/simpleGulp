import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';

export const html = () =>{
    return app.gulp.src(app.path.src.html) // "откуда взять." Для этого...
        .pipe(app.plugins.plumber( // будет кидать подсказки в окне windows
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(fileInclude()) // вставит инклюды в шаблон
        .pipe(webpHtmlNosvg()) // добавляет в html обертку из picture и source для img
        .pipe( // до бавляет приписку к именам подключаемым css и js, чтобы избежать кеширования
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ],
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )
        .pipe(app.gulp.dest(app.path.build.html)) // "куда выгрузить"
}

// сделать алиасы на webpack. Се йчас нужно писать пути в html с учетом вложенности