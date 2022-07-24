import ttf2woff from 'gulp-ttf2woff'
import ttf2woff2 from 'gulp-ttf2woff2'
import fs from "fs";

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.src.fonts}`)
        .pipe(ttf2woff())
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const ttfToWoff2 = () => {
    return app.gulp.src(`${app.path.src.fonts}`)
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const writeFontsInFile = () => {
    const fontsFilePath = `${app.path.srcFolder}/scss/fonts.scss`; // путь для файла с шрифтами
    fs.readdir(app.path.build.fonts, (err, fontsFiles)=>{
        if(err){
            return console.error('Шррифты для конвертации не найдены! Выход из задачи! ')
        }

        console.log('Сконвертированные шрифты найдены...')
        console.log('Сконвертированные шрифты: ' + fontsFiles)

        if(fs.existsSync(fontsFilePath)){
            console.log('Scss файл для подключения шрифтов найден...')
            console.log('Для изменения файла его нужно удалить и перезапустить gulp!')

        }else {
            console.log('Scss файл для подключения шрифтов НЕ найден...')
            console.log('Создание файла для подключения шрифтов...')
            fs.writeFile(fontsFilePath, '// File with fonts style', err=>'')

            let currentFont = '';

            fontsFiles.forEach(font=>{
                let fontName = font.split('.')[0];

                if(fontName !== currentFont){
                    console.log("Добавляем новый шрифт: " + fontName)
                    let fontFaceName = fontName.split('-')[0];
                    console.log('Будет добавлен шрифт: ', fontFaceName)

                    let fontWeight = fontName.split('-')[1] ? fontName.split('-')[1] : 'none';
                    fontWeight = fontWeight.toLowerCase()
                    console.log('Жирность шрифта: ', fontWeight)

                    if (fontWeight === 'thin') {
                        fontWeight = 100;
                    } else if (fontWeight === 'extralight') {
                        fontWeight = 200;
                    } else if (fontWeight === 'light') {
                        fontWeight = 300;
                    } else if (fontWeight === 'medium') {
                        fontWeight = 500;
                    } else if (fontWeight === 'semibold') {
                        fontWeight = 600;
                    } else if (fontWeight === 'bold') {
                        fontWeight = 700;
                    } else if (fontWeight === 'extrabold' || fontWeight === 'heavy') {
                        fontWeight = 800;
                    } else if (fontWeight === 'black') {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }

                    console.log('Записываем шрифты в файл "fonts.scss"');

                    fs.appendFile(fontsFilePath, `\n@font-face {\n\tfont-family: ${fontFaceName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontName}.woff2") format("woff2"), url("../fonts/${fontName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, ()=>'');

                    currentFont = fontName; // указатель клторывй не даст записывать повторно шрифт с таким же именем

                }else {
                    console.log("Шрифт: " + fontName + " уже добавлен. Пропускаем его!");
                }


            })
        }
    })
    return app.gulp.src(`${app.path.srcFolder}`); // закрывает задачу для gulp. Другой пользы вроде нет.
}