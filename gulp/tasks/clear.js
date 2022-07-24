import {deleteAsync} from 'del';

export const deleteOld = () => {
    return deleteAsync(app.path.clean)
}