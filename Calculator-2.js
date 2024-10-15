let display = document.getElementById('display');
let historyDiv = document.getElementById('history');
let history = [];
const audio = new Audio('button-press.mp3'); // Preload sound

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.innerText;
        audio.currentTime = 0; // Reset audio to start
        audio.play();

        if (value === 'C') {
            display.value = '';
        } else if (value === '=') {
            try {
                const result = eval(display.value);
                if (typeof result === 'number') {
                    history.push(`${display.value} = ${result}`);
                    display.value = result;
                    updateHistory();
                } else {
                    throw new Error("Invalid Expression");
                }
            } catch {
                display.value = 'Invalid Expression';
            }
        } else {
            if (display.value === 'Invalid Expression' || history.length > 0 && !display.value) {
                display.value = '';
            }
            display.value += value;
        }
    });
});

function updateHistory() {
    historyDiv.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
}

function clearHistory() {
    history = [];
    updateHistory();
        display.value = ''; // Clear the display when history is cleared
    }

document.getElementById('clear-history').addEventListener('click', clearHistory);
