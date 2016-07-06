import * as posts from './posts'
import * as user from './user'
import * as post from './post'
import * as styles from './styles.js'
import * as images from './images.js'

export default {
    ...posts,
    ...user,
    ...post,
    ...styles,
    ...images
}
