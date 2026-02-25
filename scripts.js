//What the user is currently typing (as text)
let typedNumberText = ''

//The number we store for calculations
let storedNumber = null

// The current operator currently selected (+ - / *)
let currentOperator = ''

//Used only for displaying the history line
// Example: ['2', '+', '3']
let historyParts = []

//-----------------
//Helper Functions
//-----------------

function setStatus(message) {
    document.getElementById('statusLine').textContent = message
}

function showSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    if (op === '-') return '&#x2212';
    return op;
}

function updateScreen() {
    const display = document.getElementById('displayLine')
    const history = document.getElementById('historyLine')
    const status = document.getElementById('statusLine')

    display.textContent = typedNumberText
}

function pressNumber(digit) {
    setStatus('')
    if (typedNumberText === '0') {
        typedNumberText = digit;
    } else {
        typedNumberText = typedNumberText + digit
    }
    updateScreen()
}

function pressOperator(op) {

    setStatus('')

    if (typedNumberText === '' && storedNumber === null) {
        setStatus('Please enter a number first');
    }
    if (storedNumber === null) {
        storedNumber = Number(typedNumberText)
        currentOperator = op
        historyParts = [String(storedNumber), currentOperator]
        typedNumberText = ''
        updateScreen();
    }
}