// копирует результат в папку dist
export const copy = () =>{
    return app.gulp.src(app.path.src.files) // "откуда взять." Для этого...
        .pipe(app.gulp.dest(app.path.build.files)) // "куда перенести". Выполни вот это
}