import React, { useEffect } from 'react';
import { Chess, } from 'chess.js';
import Board from '../components/Board';
import RandomAgent from './RandomAgent';

interface AgentProps {
    game: Chess;
    setGame: React.Dispatch<React.SetStateAction<Chess>>;
    isHumanTurn: boolean;
    setIsHumanTurn: React.Dispatch<React.SetStateAction<boolean>>;
    updateState: () => void;
}

interface Agent {
    move: () => void,
    // getBestMove: () => string,
    // evalBoard: (board: Board) => number,
    // getPieceValue: (piece: string) => number,
}


const AgentComponent: React.FC<AgentProps> = (props) => {
    const randomAgent = new RandomAgent(props);

    useEffect(() => {
        if (!props.isHumanTurn) {
            randomAgent.move();
        }
    }, [props.isHumanTurn]);

    return null;
};

export default AgentComponent;



export type { AgentProps, Agent };
