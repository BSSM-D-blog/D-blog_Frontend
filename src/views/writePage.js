import React, { Component } from 'react';
import Editor from "./editor/text";
import Header from "./header";
class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Editor />
            </div>
        );
    }
}
export default App;

