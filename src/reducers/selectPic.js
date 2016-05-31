import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { SELECT_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM, SELECT_PICS_OPEN, PICK_PIC } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    isActived: true,
    selectPics: [{
        id: 'rksixl',
        picked: false,
        url: makeHost("/upload/img/2016_05_30/124049696.png"),
        thumb: makeHost("/upload/img/2016_05_30/124049696_100_0.png")
    }]
}

export default createReducer({
    [ SELECT_PIC ]: (state, action) => ({
        selectPics: [{
            id: makeId(),
            url: makeHost(action.payload.url),
            thumb: makeHost(action.payload.Ext['100_0'])
        }, ...state.selectPics],
        isActived: state.isActived
    }),
    [ SELECT_PICS_OPEN ]: (state, action) => ({
        selectPics: state.selectPics,
        isActived: true
    }),
    [ SELECT_PICS_CANCEL ]: (state, action) => ({
        selectPics: state.selectPics,
        isActived: false
    }),
    [ SELECT_PICS_CONFIRM ]: (state, action) => {
        console.log(state.selectPics.filter((pic) => pic.picked))
        return {
            selectPics: state.selectPics,
            isActived: false
        }
    },
    [ PICK_PIC ]: (state, action) => {
        const pid = action.payload
        const selectPics = state.selectPics.map((pic) => {
            return pic.id == pid ? assign(pic, { picked: !pic.picked }) : pic
        })
        return {
            selectPics: selectPics,
            isActived: state.isActived
        }
    }
}, initialState)

function makeHost(url){
    return 'http://imgs.8zcloud.com' + url
}

function makeId(){
    return Math.random().toString(36).replace(/\W/, '').slice(1, 6);
}
