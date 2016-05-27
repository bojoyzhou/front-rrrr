import { handleActions } from 'redux-actions'

const initialState = {
    menu: [{
        name: '编辑器',
        icon: 'icon-editor'
    },{
        name: '内容库',
        icon: 'icon-doc'
    },{
        name: '样式中心',
        icon: 'icon-style'
    },{
        name: '数据报表',
        icon: 'icon-data'
    },{
        name: '个人中心',
        icon: 'icon-user'
    }],
    actived: 0
}

// export default handleActions({
//     'none' (state, action) {
//         return state
//     }
// }, initialState)

export default function header(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
