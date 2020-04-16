export const COLS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const ROWS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const TYPES = {
    ROOK: "R",
    HORSE: "N",
    BISHOP: "B",
};

// setup pieces
export const pieces = [
    { type: "R", color: "B", position: "a8" },
    { type: "N", color: "B", position: "b8" },
    { type: "B", color: "B", position: "c8" },
    { type: "K", color: "B", position: "d8" },
    { type: "Q", color: "B", position: "e8" },
    { type: "B", color: "B", position: "f8" },
    { type: "N", color: "B", position: "g8" },
    { type: "R", color: "B", position: "h8" },
    { type: "P", color: "B", position: "a7" },
    { type: "P", color: "B", position: "b7" },
    { type: "P", color: "B", position: "c7" },
    { type: "P", color: "B", position: "d7" },
    { type: "P", color: "B", position: "e7" },
    { type: "P", color: "B", position: "f7" },
    { type: "P", color: "B", position: "g7" },
    { type: "P", color: "B", position: "h7" },
    { type: "R", color: "W", position: "a1" },
    { type: "N", color: "W", position: "b1" },
    { type: "B", color: "W", position: "c1" },
    { type: "K", color: "W", position: "d1" },
    { type: "Q", color: "W", position: "e1" },
    { type: "B", color: "W", position: "f1" },
    { type: "N", color: "W", position: "g1" },
    { type: "R", color: "W", position: "h1" },
    { type: "P", color: "W", position: "a2" },
    { type: "P", color: "W", position: "b2" },
    { type: "P", color: "W", position: "c2" },
    { type: "P", color: "W", position: "d2" },
    { type: "P", color: "W", position: "e2" },
    { type: "P", color: "W", position: "f2" },
    { type: "P", color: "W", position: "g2" },
    { type: "P", color: "W", position: "h2" },
];

export const getProps = (property) => (cb) => {
    return Object.keys(cb).map((key) => cb[key][property]);
};

export const initChessboard = function () {
    let chessBoard = {};
    // init chessboard
    for (let i = 0; i < ROWS.length; i++) {
        for (let j = 0; j < COLS.length; j++) {
            chessBoard[`${COLS[i]}${ROWS[j]}`] = {
                row: j,
                col: i,
                type: "",
                color: "",
                position: `${COLS[i]}${ROWS[j]}`,
            };
        }
    }

    for (let i = 0; i < pieces.length; i++) {
        chessBoard[pieces[i].position] = {
            ...chessBoard[pieces[i].position],
            type: pieces[i].type,
            color: pieces[i].color,
        };
    }
    return chessBoard;
};

export const positions = getProps("position")(initChessboard());

export const isOutOfBounds = (col, row) => {
    return col < 0 || col >= COLS.length || row < 0 || row >= ROWS.length;
};

export const getMoves = (value) => (cb) => {
    const piece = { ...cb[value.position], ...value };
    if (piece.type === TYPES.ROOK) {
        return getRookMoves(piece)(cb);
    }
    if (piece.type === TYPES.HORSE) {
        return getKnightMoves(piece)(cb);
    }
    if (piece.type === TYPES.BISHOP) {
        return getBishopMoves(piece)(cb);
    }

    return [];
};

export const getRookMoves = (piece) => (cb) => {
    const moves = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    let nextMoves = [];
    for (let move of moves) {
        let newRow = piece.row + move[0];
        let newCol = piece.col + move[1];

        let sugg = true;
        while (sugg && !isOutOfBounds(newRow, newCol)) {
            const pieceName = `${COLS[newCol]}${ROWS[newRow]}`;
            const testPiece = cb[pieceName];

            if (testPiece && testPiece.type) {
                if (testPiece.color === piece.color) {
                    sugg = false;
                } else {
                    nextMoves.push(pieceName);
                    sugg = false;
                }
            }
            if (sugg) {
                nextMoves.push(pieceName);
                newRow += move[0];
                newCol += move[1];
            }
        }
    }
    return nextMoves;
};

export const getBishopMoves = (piece) => (cb) => {
    const moves = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
    ];
    let nextMoves = [];
    for (let move of moves) {
        let newRow = piece.row + move[0];
        let newCol = piece.col + move[1];

        let sugg = true;
        while (sugg && !isOutOfBounds(newRow, newCol)) {
            const pieceName = `${COLS[newCol]}${ROWS[newRow]}`;
            const testPiece = cb[pieceName];

            if (testPiece && testPiece.type) {
                if (testPiece.color === piece.color) {
                    sugg = false;
                } else {
                    nextMoves.push(pieceName);
                    sugg = false;
                }
            }
            if (sugg) {
                nextMoves.push(pieceName);
                newRow += move[0];
                newCol += move[1];
            }
        }
    }
    return nextMoves;
};

export const getKnightMoves = (piece) => (cb) => {
    const moves = [
        [-1, -2],
        [-2, -1],
        [1, -2],
        [-2, 1],
        [2, -1],
        [-1, 2],
        [2, 1],
        [1, 2],
    ];
    let nextMoves = [];
    for (let move of moves) {
        let newRow = piece.row + move[0];
        let newCol = piece.col + move[1];
        if (!isOutOfBounds(newRow, newCol)) {
            const pieceName = `${COLS[newCol]}${ROWS[newRow]}`;
            const testPiece = cb[pieceName];

            if (!testPiece.type || testPiece.color !== piece.color) {
                nextMoves.push(pieceName);
            }
        }
    }
    return nextMoves;
};
