import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js'

const Game: React.FC = () => {
    const [game] = useState(new Chess());
    const [status, setStatus] = useState<string>('');
    const [fen, setFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');// Start state
    const [pgn, setPgn] = useState<string>('');

    React.useEffect(() => updateState(), []) // initialise state

    function updateState() {
        const moveColor = game.turn() === 'w' ? 'White' : 'Black';
        let statusText;

        if (game.isCheckmate())
            statusText = 'Game over, ' + moveColor + ' is in checkmate.'

        if (game.isDraw())
            statusText = 'Game over, drawn position'

        if (!statusText) {
            statusText = moveColor + ' to move'

            if (game.isCheck()) {
                statusText += ', ' + moveColor + ' is in check'
            }
        }

        setFen(game.fen())
        setPgn(game.pgn())
        setStatus(statusText)
    }

    function handleMove(source: string, target: string) {
        try {
            game.move({
                from: source,
                to: target,
                promotion: 'q'
            });
        } catch (error) { // illegal move
        }
        updateState()
    }

    function allowDrag(piece: string) {
        // do not pick up pieces if the game is over
        if (game.isGameOver()) return false

        // only pick up pieces for the side to move
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false
        }
        return true
    }

    return (
        <div className='board'>
            <div>
                <Chessboard
                    position={fen}
                    allowDrag={(move) => allowDrag(move.piece)}
                    onDrop={(move) => handleMove(move.sourceSquare, move.targetSquare)}
                />
                <h3 id="status">{status}</h3>
            </div>
        </div >
    );
};

export default Game;
