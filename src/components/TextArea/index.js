import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.css'

class TextArea extends Component {
    componentDidMount(){
        this.ue = UE.getEditor('editor')
    }
    render() {
        return (
            <div className="container-textarea">
                <script id="editor" type="text/plain" width="500"></script>
            </div>
        )
    }
}

export default TextArea
