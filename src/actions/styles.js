import createAction, {
    createActionAsync
} from './createAction'
import * as constants from '../constants'

export const loadStyles = createActionAsync(constants.STYLE_GET, (id) => {
    return fetch(`/api/pluginpager?stype=` + id, {
        credentials: 'include'
    })
}, (json, id) => {
    json.id = id
    return json
})
export const loadStylesFromCache = createAction(constants.STYLE_RENDER)
