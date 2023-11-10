import React, { useEffect } from 'react';
import { Chess } from 'chess.js';
import Board from '../components/Board';
import { AgentProps, Agent } from './Agent';

const AgentImplementation: React.FC<AgentProps> = ({
    game,
    setGame,
    isHumanTurn,
    setIsHumanTurn,
    updateState,
    setPgn,
}) => {
    useEffect(() => {
        if (!isHumanTurn) {
            makeMove();
        }
    }, [isHumanTurn]);

    const makeMove = () => {
        const bestMove = getBestMove();
        game.move(bestMove);
        setGame(new Chess(game.fen()));
        updateState();
        setPgn(game.pgn());
        setIsHumanTurn(true);
    };

    const getBestMove = (): string => {
    };

    const evalBoard = (board: Board): number => {
        return 0;
    };

    const getPieceValue = (piece: string): number => {

        switch (piece) {
            case 'p':
                return -10; // Pawn
            case 'r':
                return -50; // Rook
            case 'n':
                return -30; // Knight
            case 'b':
                return -30; // Bishop
            case 'q':
                return -90; // Queen
            case 'k':
                return -900; // King
            default:
                return 0;
        }
    };

    return null;
};

export default AgentImplementation;
