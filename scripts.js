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
    if (op === '-') return '-';
    return op;
}

function updateScreen() {
    const display = document.getElementById('displayLine')
    const history = document.getElementById('historyLine')
    const status = document.getElementById('statusLine')

    if (typedNumberText !== '') {
        display.textContent = typedNumberText
    } else {
        display.textContent = '0'
    }


    if (historyParts.length === 0) {
        history.textContent = ''
    }
    if (historyParts.length === 1) {
        history.textContent = historyParts[0]
    }
    if (historyParts.length === 2) {
        history.textContent = historyParts[0] + ' ' + showSymbol(historyParts[1])
    }
    if (historyParts.length === 3) {
        history.textContent = historyParts[0] + ' ' + (historyParts[1]) + ' ' + historyParts[2]
    }

    if (status.textContent === '') {
        status.textContent = 'Ready'
    }
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
    // if nothing is typed and no stored number, we can't do anything
    if (typedNumberText === '' && storedNumber === null) {
        setStatus('Please enter a number first');
        updateScreen();
    }
    // FIRST operator press: store first number
    if (storedNumber === null) {
        storedNumber = Number(typedNumberText)
        currentOperator = op
        historyParts = [String(storedNumber), currentOperator]
        typedNumberText = ''
        updateScreen();
    }
    // if second number typed, calculate immediately
    if (typedNumberText !== '') {
        const secondNumber = Number(typedNumberText)
        // can't divide by zero
        if (currentOperator === '/' && secondNumber === 0) {
            setStatus('Cannot divide by zero')
            updateScreen()
            return
        }
    }
}

function clearAll() {
    setStatus('')
    typedNumberText = ''
    storedNumber = null
    currentOperator = ''
    historyParts = []

    setStatus('Cleared')
    updateScreen()
}