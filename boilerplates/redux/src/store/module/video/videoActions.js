/**
 * Created by lijie on 16/7/21.
 */

import { createAction } from 'redux-actions';


import * as constant from './videoConstants';


export function addVideo(video) {
    return {
        type: constant.ADD_VIDEO,
        video
    }
}

//ɾ�� item ֻ��Ҫ�õ����� id
export function deleteItem(id) {
    return {
        type: constant.DEL_VIDEO,
        id
    }
}

