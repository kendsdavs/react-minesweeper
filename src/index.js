const React = require('react')
const ReactDOM = require('react-dom')

const App = require('./app')

ReactDOM.render(<App start={Date.now()} />, document.getElementById('root'))
