// Import the chess module
import { Chess } from 'chess.js'

// Create a new instance of the chess game
const chess = new Chess();

while (!chess.isGameOver()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
}
console.log(chess.pgn())




