import { Chess, } from 'chess.js';
import { AgentProps, Agent } from './Agent';

class MinmaxAgent implements Agent {
    private game: Chess;
    private setIsHumanTurn: React.Dispatch<React.SetStateAction<boolean>>;
    private updateState: () => void;
    private maxDepth = 2;
    private color: string;
    private visited: Map<string, number>
    private pieceValues: { [key: string]: number } = {
        "p": 10,
        "n": 30,
        "b": 30,
        "r": 50,
        "q": 90,
        "k": 200,
    };

    constructor(props: AgentProps) {
        this.game = props.game;
        this.color = this.game.turn()
        this.setIsHumanTurn = props.setIsHumanTurn;
        this.updateState = props.updateState;
        this.visited = new Map()
    }

    public move(): void {
        if (!this.game.isGameOver() && !this.game.isCheckmate()) {
            const bestMove = this.getBestMove(this.game);

            this.game.move(bestMove);
            this.updateState();
            this.setIsHumanTurn(true);
        }
    }

    private getBestMove(game: Chess): string {
        let bestMove: string = '';
        let bestValue: number = Number.NEGATIVE_INFINITY;

        const legalMoves = game.moves();

        for (const move of legalMoves) {
            game.move(move);

            let value = this.visited.get(game.fen())
                ?? this.minimax(game, this.maxDepth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, false);

            if (!this.visited.has(game.fen()))
                this.visited.set(game.fen(), value)

            game.undo();

            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }
        }

        return bestMove;
    }

    public evalBoard(game: Chess): number {
        if (game.isCheckmate() && game.turn() === this.color)
            return -200
        else if (game.isCheckmate())
            return 200


        let score = 0
        game.board().forEach(row => {
            row.forEach(col => {
                if (!col)
                    return
                let value = this.pieceValues[col?.type]
                if (col.color !== this.color)
                    value = -value
                score += value
            })

        })


        return score;
    }


    private minimax(game: Chess, depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number {
        if (depth === 0 || game.isGameOver())
            return this.evalBoard(game);

        const legalMoves = game.moves();

        if (maximizingPlayer) {
            let maxEval = Number.NEGATIVE_INFINITY;

            for (const move of legalMoves) {
                game.move(move);
                const score = this.minimax(game, depth - 1, alpha, beta, false);
                game.undo();
                maxEval = Math.max(maxEval, score);
                alpha = Math.max(alpha, score);

                if (beta <= alpha)
                    break; // Beta cut-off
            }

            return maxEval;
        } else {
            let minEval = Number.POSITIVE_INFINITY;

            for (const move of legalMoves) {
                game.move(move);
                const score = this.minimax(game, depth - 1, alpha, beta, true);
                game.undo();
                minEval = Math.min(minEval, score);
                beta = Math.min(beta, score);

                if (beta <= alpha)
                    break; // Alpha cut-off
            }

            return minEval;
        }
    }


}

export default MinmaxAgent;


