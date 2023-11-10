import React, { useEffect } from 'react';
import { Chess, } from 'chess.js';
import Board from '../components/Board';

interface AgentProps {
    game: Chess;
    setGame: React.Dispatch<React.SetStateAction<Chess>>;
    isHumanTurn: boolean;
    setIsHumanTurn: React.Dispatch<React.SetStateAction<boolean>>;
    updateState: () => void;
    setPgn: (pgn: string) => void;
}

interface Agent {
    move: () => void,
    getBestMove: () => string,
    evalBoard: (board: Board) => number,
    getPieceValue: (piece: string) => number,
}

export type { AgentProps, Agent };
