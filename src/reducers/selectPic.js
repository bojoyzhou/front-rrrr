import { createReducer, assign } from './createReducer'
import ajax from 'ajax'
/**
 * 导入当前reduce的常量
 *
 */
import { GET_USER_PICS, SELECT_PIC, SELECT_PICS_CANCEL, SELECT_PICS_CONFIRM, SELECT_PICS_OPEN, PICK_PIC, DELETE_PIC, SWITCH_LOCAL, SWITCH_NET, SEARCH_ON_NET } from '../constants'

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
    selectPics: [
        // {
        //     id: 'rksixl',
        //     picked: false,
        //     url: makeHost("/upload/img/2016_05_30/124049696.png"),
        //     thumb: makeHost("/upload/img/2016_05_30/124049696_100_0.png")
        // }
    ],
    type: 'local',
    netPics: [],
    keyword: '',
    pn: 1,
    rn: 20
}

export default createReducer({
    [ GET_USER_PICS ]: {
        preload: (action) => ({
            url:'/api/getuserpics',
            data:{},
            dataType:'json'
        }),
        success: (result,state) => (assign(state, {
            pics: result.list.map((pic) => {
                pic.url = pic.pic
                return pic
            }) || []
        }))
    },
    [ SELECT_PIC ]: (state, action) => (assign(state, {
        selectPics: [{
            id: makeId(),
            url: makeHost(action.payload.url),
            thumb: makeHost(action.payload.Ext['100_0'])
        }, ...state.selectPics],
    })),
    [ SELECT_PICS_OPEN ]: (state, action) => (assign(state, {
        isActived: true
    })),
    [ SWITCH_LOCAL ]: (state, action) => (assign(state, {
        type: 'local'
    })),
    [ SWITCH_NET ]: (state, action) => (assign(state, {
        type: 'network'
    })),
    [ SEARCH_ON_NET ]: {
        preload: (action, state) => {
            const keyword = action.payload && action.payload.keyword || state.keyword
            return {
                url:'/api/image-search',
                data: {
                    keyword: keyword,
                    pn: state.pn,
                    rn: state.rn
                },
                type: 'GET',
                dataType:'json'
            }
        },
        success: (result, state, action) => {
            let keyword = action.payload && action.payload.keyword
            let netPics
            if(keyword && keyword != state.keyword){
                netPics = []
            }else{
                netPics = state.netPics
            }
            const pics = result.result.map((pic) => ({
                id: makeId(),
                picked: false,
                ...pic
            }))
            return assign(state, {
                netPics: [...netPics, ...pics],
                keyword: keyword,
                pn: state.pn + 1
            })
        }
    },
    [ SELECT_PICS_CANCEL ]: (state, action) => (console.log(Date.now()),assign(state, {
        isActived: false
    })),
    [ SELECT_PICS_CONFIRM ]: {
        preload: (action, state) => {
            let pics
            if(state.type == 'local') {
                pics = state.selectPics
            }else{
                pics = state.netPics
            }
            const checked = pics.filter((pic) => {
                if(!pic.picked){
                    return false
                }
                for(let i in state.pics){
                    let p = state.pics[i];
                    if(p.id == pic.id){
                        return false
                    }
                }
                return true
            })
            const data = checked.map((pic) => ({
                img: pic.url,
                img_100: pic.thumb
            }))
            if(!data.length){
                return assign(state, {
                    isActived: false
                })
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
            let pics
            if(state.type == 'local') {
                pics = state.selectPics
            }else{
                pics = state.netPics
            }
            let checked = pics.filter((pic) => {
                if(!pic.picked){
                    return false
                }
                for(let i in state.pics){
                    let p = state.pics[i];
                    if(p.id == pic.id){
                        return false
                    }
                }
                return true
            })
            checked = checked.map((pic, i) => {
                pic.id = result.list[i]
                return pic
            })
            return assign(state, {
                isActived: false,
                pics: [
                    ...checked,
                    ...state.pics
                ]
            })
        }
    },
    [ PICK_PIC ]: (state, action) => {
        let pid
        if(action.payload.type == 'net'){
            pid = action.payload.id
            const netPics = state.netPics.map((pic) => {
                return pic.id == pid ? assign(pic, { picked: !pic.picked }) : pic
            })
            return assign(state, {
                netPics
            })
        }

        pid = action.payload
        const selectPics = state.selectPics.map((pic) => {
            return pic.id == pid ? assign(pic, { picked: !pic.picked }) : pic
        })
        return assign(state, {
            selectPics
        })
    },
    [ DELETE_PIC ]: (state, action) => {
        ajax({
            url: '/api/userpicsdel',
            data: {
                id: action.payload
            },
            type:'POST'
        })
        return assign(state, {
            pics: state.pics.filter((pic, idx) => {
                return pic.id !== action.payload
            })
        })
    }
}, initialState)

function makeHost(url){
    return 'http://imgs.8zcloud.com' + url
}

function makeId(){
    return Math.random().toString(36).replace(/\W/, '').slice(1, 6);
}
