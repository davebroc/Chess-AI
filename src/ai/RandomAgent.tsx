import { Chess } from 'chess.js';
import { AgentProps, Agent } from './Agent';

class RandomAgent implements Agent {
    private game: Chess;
    private setIsHumanTurn: React.Dispatch<React.SetStateAction<boolean>>;
    private updateState: () => void;

    constructor(props: AgentProps) {
        this.game = props.game;
        this.setIsHumanTurn = props.setIsHumanTurn;
        this.updateState = props.updateState;
    }

    public move(): void {
        if (!this.game.isGameOver() && !this.game.isCheckmate()) {
            const legalMoves = this.game.moves();
            const randomIndex = Math.floor(Math.random() * legalMoves.length);
            const randomMove = legalMoves[randomIndex];

            this.game.move(randomMove);
            this.updateState();
            this.setIsHumanTurn(true);
        }
    }
}

export default RandomAgent;
