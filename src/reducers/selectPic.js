import { createReducer, assign } from './createReducer'

/**
 * 导入当前reduce的常量
 *
 */
import { GET_USER_PICS, SELECT_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM, SELECT_PICS_OPEN, PICK_PIC } from '../constants'

/**
 * 定义默认的state
 *
*/
const initialState = {
    pics: [
        // {
        //     url: '',
        //     thumb: ''
        // }
    ],
    isActived: false,
    selectPics: [{
        id: 'rksixl',
        picked: false,
        url: makeHost("/upload/img/2016_05_30/124049696.png"),
        thumb: makeHost("/upload/img/2016_05_30/124049696_100_0.png")
    }]
}

export default createReducer({
    [ GET_USER_PICS ]: {
        preload: (action) => ({
            url:'/api/getuserpics',
            data:{
                uid:2
            },
            dataType:'json'
        }),
        success: (result,state) => (assign(state, {
            pics: result.list
        }))
    },
    [ SELECT_PIC ]: (state, action) => (assign({
        selectPics: [{
            id: makeId(),
            url: makeHost(action.payload.url),
            thumb: makeHost(action.payload.Ext['100_0'])
        }, ...state.selectPics],
    })),
    [ SELECT_PICS_OPEN ]: (state, action) => (assign(state, {
        selectPics: state.selectPics,
        isActived: true
    })),
    [ SELECT_PICS_CANCEL ]: (state, action) => (assign(state, {
        selectPics: state.selectPics,
        isActived: false
    })),
    [ SELECT_PICS_CONFIRM ]: {
        preload: (action, state) => {
            const checked = state.selectPics.filter((pic) => pic.picked)
            const data = {
                uid: 2,
                imgs: checked.map((pic) => ({
                    img: pic.url,
                    img_100: pic.thumb
                }))
            }
            return {
                url:'/api/userpicssave',
                data: {
                    param: JSON.stringify(data)
                },
                type: 'POST',
                dataType:'json'
            }
        },
        success: (result, state) => {
            if(result.ret_code === 0){
                const checked = state.selectPics.filter((pic) => pic.picked)

                return assign(state, {
                    isActived: false,
                    pics: [
                        ...checked,
                        ...state.pics
                    ]
                })
            }
            return state
            return state
        }
    },
    [ PICK_PIC ]: (state, action) => {
        const pid = action.payload
        const selectPics = state.selectPics.map((pic) => {
            return pic.id == pid ? assign(pic, { picked: !pic.picked }) : pic
        })
        return assign(state, {
            selectPics: selectPics,
        })
    }
}, initialState)

function makeHost(url){
    return 'http://imgs.8zcloud.com' + url
}

function makeId(){
    return Math.random().toString(36).replace(/\W/, '').slice(1, 6);
}
