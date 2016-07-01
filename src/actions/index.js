import * as posts from './posts'
import * as user from './user'
import * as post from './post'

export default {
    ...posts,
    ...user,
    ...post
}
