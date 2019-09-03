import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  
  static defaultProps = {
    nrows: 5,
    ncols: 5, 
    chanceLightStartsOn:  0.25,
  };

  
  constructor(props) {
    super(props);
    
    
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
    
    // TODO: set initial state
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.changeGridTo3 = this.changeGridTo3.bind(this)
  }
  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  
  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values

    for (let y=0; y < this.props.nrows; y++) {
      let row = [];
      for(let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }

    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      //currrent cell
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    
    // TODO: flip this cell and the cells around it
    flipCell(y, x); //current cell
    flipCell(y-1, x);//north cell
    flipCell(y+1, x); //south cell
    flipCell(y, x-1); //west cell
    flipCell(y,x+1); // east cell

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // Convert state.Board to string
    const hasWon = board.every(row => row.every(cell => cell !== true))
   
    this.setState({board: board, hasWon: hasWon });
   
  }

  // CHANGE GRID BUTTONs
  changeGridTo3() {
    this.setState( { board: this.createBoard()} );
  }


  /** Render game board or winning message. */

  render() {
    // Create the table
    const boardDraw = this.state.board.map((tr, idx) => {
     return (<tr key={idx}>
              {tr.map((col, j) => <Cell 
                                    key={`${idx}-${j}`} 
                                    value={`${idx}-${j}`} 
                                    flipCellsAroundMe={this.flipCellsAround} 
                                    isLit={col}
                                    />)}
             </tr> 
            )
      }
    )

    // Render isWon or not
    let drawTable, youWon;
    if(!this.state.hasWon) {
      drawTable = (
        <div>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>OUT</div>
          </div>
          <div className='Board'>
            <table className='Board-table'>
              <tbody>
                {boardDraw}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      youWon = (
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>

      )
    }

    return (
      <div>
          {drawTable}
          {youWon}
      </div>
    )

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
