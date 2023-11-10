import { Square, PieceSymbol, Color } from 'chess.js'

type Board = {
    square: Square;
    type: PieceSymbol;
    color: Color;
}[][];

export default Board