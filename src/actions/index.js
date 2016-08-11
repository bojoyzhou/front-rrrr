import * as posts from './posts'
import * as alert from './alert'
import * as user from './user'
import * as post from './post'
import * as styles from './styles.js'
import * as images from './images.js'

export default {
    ...alert,
    ...posts,
    ...user,
    ...post,
    ...styles,
    ...images
}
