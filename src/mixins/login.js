import Login from '../components/Login'
export default {
    onClickLogin: () => {
        this.setState(Object.assign({}, this.state, {
            showLogin: true
        }))
    },
    onClickClose: () => {
        this.setState(Object.assign({}, this.state, {
            showLogin: false
        }))
    },
    login: (data) => {
        const { actions } = this.props
        actions.userLogin(data)
    },
    componentWillReceiveProps: () => {
        this.setState(Object.assign({}, this.state, {
            showLogin: false
        }))
    },
    renderLogin:() => {
        const { username } = this.props
        const { showLogin } = this.state
        return (
            <div>
                { showLogin ? <Login
                    isLogin = {!!username }
                    close = { this.onClickClose }
                    login = { this.login }
                    > </Login> : null
                }
            </div>
        )
    }
}
