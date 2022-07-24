import {copy} from "./copy.js";
import {deleteAsync} from 'del';
import {html} from "./html.js";
import {scss} from "./scss.js";
import {js} from "./js.js";
import {images} from "./images.js";

const deleteForWatcher = () => {
    return deleteAsync(app.path.build.files)
}

export function watcher(){
    app.gulp.watch(app.path.watch.files, app.gulp.series(deleteForWatcher, copy));
    app.gulp.watch(app.path.watch.html, html);
    app.gulp.watch(app.path.watch.scss, scss);
    app.gulp.watch(app.path.watch.js, js);
    app.gulp.watch(app.path.watch.images, images);
}
