import replace from 'gulp-replace'; // поиск и замена
import plumber from 'gulp-plumber'; // обработка ошибок
import notify from 'gulp-notify'; // сообщения подсказки

import newer from 'gulp-newer'; // будет проверять обновились ли файлы перед тем как их перезаписать

export const plugins = {
    replace,
    plumber,
    notify,
    newer,
}