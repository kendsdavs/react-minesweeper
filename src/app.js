const React = require('react')
const minesweeper = require('minesweeper')


const closeCss = {
  border: '1px',
  borderStyle: 'solid',
  backgroundColor: 'Ivory',
  borderLeftColor: 'white',
  borderRightColor: 'black',
  borderTopColor: 'white',
  borderBottomColor: 'black',
  minheight: "40px",
  minWidth: "40px"
}
const openCss = {
  border: '1px',
  borderStyle: 'solid',
  backgroundColor: 'LightGray',
  borderLeftColor: 'black',
  borderRightColor: 'white',
  borderTopColor: 'black',
  borderBottomColor: 'white',
  minheight: "40px",
  minWidth: "40px"
}



const App = React.createClass({
  getInitialState() {
    return {
      grid: [],
      state: 0,
      board: null,
      elapsed: 0
    }
  },

  openCell(x,y) {
    return (e) => {
      let board = this.state.board
      board.openCell(x,y) //given in the minesweeper require
      this.setState({
        grid: board.grid(),
        state: board.state()
      })
    }
  },
  setFlag(x,y) {
    return (e) => {
      e.preventDefault()
      let board = this.state.board
      board.cycleCellFlag(x,y) //given in the minesweeper require
      this.setState({
        grid: board.grid(),
        state: board.state()
      })
    }
  },
  componentDidMount() {
    var mineArray = minesweeper.generateMineArray({
      rows: 10,
      cols: 10,
      mines: 15
    });
    var board = new minesweeper.Board(mineArray)
    var grid = board.grid()
    this.timer = setInterval(this.tick, 1000);
    console.log(grid)
    this.setState({
      board: board,
      grid: board.grid(),
      state: board.state()
      })
    //console.log(this.setState({grid}))
  },
  componentWillUnmount() {
    clearInterval(this.timer);
  },
  tick: function(){

        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered

  this.setState({
    elapsed: new Date() - this.props.start
  });
},
  newGame () {
    var mineArray = minesweeper.generateMineArray({
      rows: 10,
      cols: 10,
      mines: 15
    });
    var board = new minesweeper.Board(mineArray)
    var grid = board.grid()
    //console.log(grid)
    this.setState({
      board: board,
      grid: board.grid(),
      state: board.state()
      })
  },
  render() {
    var elapsed = Math.round(this.state.elapsed/ 100 )
    var seconds = (elapsed/10)


    const determineCellState = (cell) => {
      if(cell.flag === 1) {
        return {
          css: closeCss,
          text: '🚩'
        }
      }
      if(this.state.state < 2) {
        if(cell.state === 0) {
          return {
            css: closeCss,
            text: '🎄'
          }
        } if (cell.state === 1) {
          return {
            css:openCss,
            text: cell.numAdjacentMines >= 1 ? cell.numAdjacentMines : null
          }
        }
        else {
          return {
            css: openCss,
            text:(cell.state === 1 && cell.isMine) ? '😪' : null
          }
        }
      } else {
        return {
          css: openCss,
          text: cell.isMine ? '😪' : null
        }
      }
    }

    const td = (cell, i) => {
      const cellState = determineCellState(cell)
      return (
        <td
          onClick={this.openCell(cell.x, cell.y)}
          onContextMenu={this.setFlag(cell.x,cell.y)}
          style={cellState.css}>
          <center>{cellState.text}</center>
        </td>
      )
    }
    const tr = (row, i) => <tr>{row.map(td)}</tr>
    return (

      <div className="tc" start={Date.now()}>
        {console.log(this.state.state)}
        <h1>Christmas Minesweeper</h1>
        {this.state.state === 2 ? <button onClick={this.newGame}>New Game?</button> : null}
        <div>{this.state.state}</div>
        <h2>{seconds}</h2>
        <table className="center">
          <tbody>
          {this.state.grid.map(tr)}
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = App
