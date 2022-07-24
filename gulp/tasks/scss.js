import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // сжатие css файла
import webpcss from 'gulp-webpcss'; // вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // группировка медиа запросов


const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: true})

        .pipe(app.plugins.plumber( // Отлов ошибок
            app.plugins.notify.onError({
                title: 'SCSS',
                message: "Error: <%= erorr.message %>"
            })
        ))

        .pipe(sass({ // Преобразование в css
            outputStyle: 'expanded',
        }))

        .pipe(groupCssMediaQueries()) // Группирует медиазапросы из разных файлов и все сливает в главный css

        .pipe(webpcss({ // Требует доп плагин webp-converter, он и преобразует в новый формат
            webpClass: ".webp", // Добавит класс .webp в css файл + расширение webp для картинок в css(типа background: url();)
            noWebpClass: ".no-webp" // Добавит класс .no-webp в css файл для картинок в css(типа background: url();)
        }))

        .pipe(autoprefixer({ // Ставит автопрефиксы для кросс браузерности
            grid: true, // поддержка грид свойств
            overrideBrowserslist: ["last 3 versions"], // кол-во версий браузера от самой современной
            cascade: true
        }))

        .pipe(app.gulp.dest(app.path.build.css)) // Выгрузка перед сжатием, чтоб остался нормальный файл стилей на всякий случай

        .pipe(cleanCss()) // Сжатие css

        .pipe(rename({ // Переименование в min.css
            extname: ".min.css"
        }))

        .pipe(app.gulp.dest(app.path.build.css)) // Выгрузка
}