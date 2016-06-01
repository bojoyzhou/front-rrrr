import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.css'

class TextArea extends Component {
    componentDidMount(){
        const ue = UE.getEditor('editor')
        const { actions } = this.props
        actions.initEditor(ue)
    }
    render() {
        return (
            <div className="container-textarea">
                <script id="editor" type="text/plain" width="500"></script>
            </div>
        )
    }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../actions'
function mapStateToProps(state) {
    return {
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextArea)
