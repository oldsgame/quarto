/*
# posições no jogo
0 1 2
3 4 5
6 7 8

# posições que vencem e seus números correspondentes em binário e decimal, respectivamente.
0 1 2 = 111000000 = 448
3 4 5 = 000111000 = 56
6 7 8 = 000000111 = 7
0 3 6 = 100100100 = 292
1 4 7 = 010010010 = 146
2 5 8 = 001001001 = 73
0 4 8 = 100010001 = 273
2 4 6 = 001010100 = 84
empate = 111111111 = 511

# lógica para testar os valores que vencem
const ref = '';
const victory = [448, 56, 7, 292, 146, 73, 273, 84];

victory.some((value) => (value & ref === value));

# lógica para preencher as posições de cada jogador
const ref = '000000000';
ref[position] = '1';

*/

const free_pieces = [
    'assets/piece_cfdl.svg',
    'assets/piece_cfds.svg',
    'assets/piece_cfll.svg',
    'assets/piece_cfls.svg',
    'assets/piece_codl.svg',
    'assets/piece_cods.svg',
    'assets/piece_coll.svg',
    'assets/piece_cols.svg',
    'assets/piece_sfdl.svg',
    'assets/piece_sfds.svg',
    'assets/piece_sfll.svg',
    'assets/piece_sfls.svg',
    'assets/piece_sodl.svg',
    'assets/piece_sods.svg',
    'assets/piece_soll.svg',
    'assets/piece_sols.svg'
];

/*
    Propriedades na ordem:
            +--------+--------+-------+-------+
            |   3    |    2   |   1   |   0   |
        +---+--------+--------+-------+-------+
        | 0 | circle | filled | dark  | large | 
        | 1 | square |  open  | light | small |
        +---+--------+--------+-------+-------+    
    Ex.: o nibble '1011 eh um quadrado, preenchido, claro e pequeno.
    Note que esse eh o mesmo valor do indice (11) no vetor de pecas.
*/

(function() {   
    const DRAW_VALUE = 511

    let player1 = true;
    let stop = false;
    const victoryNumbers = [448, 56, 7, 292, 146, 73, 273, 84];
    let positions1 = '000000000'.split(''); // 9 positions. From 0 to 8.
    let positions2 = '000000000'.split('');
    const winnerMessage = document.getElementById('winnerMessage');
    const currentPlayer = document.getElementById('currentPlayer');

    currentPlayer.innerHTML = "Jogador atual: " + (player1 ? "Player 1" : "Player 2");

    pieceId = -1;

    function handleClick(celula) {
        if (stop || !!celula.innerHTML) {
            return;
        }

        const position = parseInt(celula.id);

        let currentPositions = player1 ? positions1 : positions2;
        currentPositions[position] = '1';

        pieceId = pieceId + 1;
        celula.innerHTML = `<img src="${free_pieces[pieceId]}" class="quarto_piece"/>`;

        checkResult(positions1, positions2, celula.innerHTML);

        player1 = !player1;

        currentPlayer.innerHTML = "Jogador atual: " + (player1 ? "Player 1" : "Player 2");
    }

    function checkResult(positions1, positions2, currentPlayer) {
        let playerPositions = player1 ? positions1 : positions2;
        const refValue = parseInt(playerPositions.join(''), 2);

        const hasWinner = victoryNumbers.some((value) => (value & refValue) === value);

        if (hasWinner) {
            winnerMessage.innerHTML = currentPlayer + ' venceu!';
            stop = true;
        }
        else
        {
            const binPositions1 = parseInt(positions1.join(''), 2);
            const binPositions2 = parseInt(positions2.join(''), 2);

            const isDraw = ((binPositions1 | binPositions2) === DRAW_VALUE);

            if (isDraw)
            {
                winnerMessage.innerHTML = ' Empate!';
                stop = true;
            }
        }
    }

    document.querySelectorAll('td').forEach(celula => {
        celula.onclick = () => handleClick(celula);
    });
})();
