// основной модуль
import gulp from 'gulp';
// импорт путей
import {path} from "./gulp/config/path.js";
// Импорт общих плагинов
import {plugins} from "./gulp/config/plugins.js";

// Передача значений в глобальную переменную, чтобы можно было исп. их в задачах
global.app = {
    path,
    gulp,
    plugins
};

// импорт задач для последующего их выполнения в gulp.task
import {copy} from './gulp/tasks/copy.js';
import {ttfToWoff, writeFontsInFile, ttfToWoff2} from "./gulp/tasks/fonts.js";
import {deleteOld} from "./gulp/tasks/clear.js";
import {watcher} from "./gulp/tasks/watcher.js";
import {html} from "./gulp/tasks/html.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";

const mainTasks = gulp.parallel(copy, html, scss, js, images)
const fonts = gulp.series(ttfToWoff, ttfToWoff2, writeFontsInFile,)

// Сбор задач в одну кучу с просьбой о последовательном исполнении этих задач
const dev = gulp.series(deleteOld, mainTasks, fonts, watcher)
// const dev = gulp.series(deleteOld, copy, writeFontsInFile)

// Запуск просьбы о исполнении задач
gulp.task('default', dev);
