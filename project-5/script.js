
const container = document.getElementById('grid-container');
const cols = 260; // Number of vertical lines
const rows = 130; // Number of horizontal lines
const width = 2;

// Fetch user controls
const colorSelect = document.getElementById('color');
const styleSelect = document.getElementById('lineStyle');
const orientationSelect = document.getElementById('orientation');
const submitButton = document.getElementById('submitButton');

var vLineCount = 0;
var hLineCount = 0;

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function saveLine(id, orientation, style, color) {
    var lines = JSON.parse(getCookie('lines') || "{}");
    if (!lines.data) {
        lines.data = [];
    }
    lines.data.push({ id, orientation, style, color });
    lines.vLineCount = vLineCount;
    lines.hLineCount = hLineCount;
    setCookie('lines', JSON.stringify(lines), 7);
}

function restoreLines() {
    var lines = JSON.parse(getCookie('lines') || "{}");
    if (lines.data) {
        lines.data.forEach(line => {
            const existingLine = document.getElementById(line.id);
            if (existingLine) {
                applyLineStyle(existingLine, line.orientation, width, line.style, line.color);
            }
        });
    }
    // Restore line counts
    vLineCount = lines.vLineCount || 0;
    hLineCount = lines.hLineCount || 0;
}

function applyLineStyle(line, orientation, width, style, color) {
    if (orientation === 'vertical') {
        line.style.borderLeft = `${width}px ${style} ${color}`;
        line.style.marginLeft = `-${width / 2}px`; // Center the line by adjusting the margin
    } else { // horizontal
        line.style.borderTop = `${width}px ${style} ${color}`;
        line.style.marginTop = `-${width / 2}px`; // Center the line by adjusting the margin
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize ID tracking
var verticalIDs = Array.from({length: cols}, (_, i) => `v-${i}`);
var horizontalIDs = Array.from({length: rows}, (_, i) => `h-${i}`);
shuffleArray(verticalIDs);
shuffleArray(horizontalIDs);

var vIndex = 0;
var hIndex = 0;

function getNextLineId(orientation) {
    if (orientation === 'vertical') {
        if (vIndex >= verticalIDs.length) {
            shuffleArray(verticalIDs);
            vIndex = 0;
        }
        return verticalIDs[vIndex++];
    } else {
        if (hIndex >= horizontalIDs.length) {
            shuffleArray(horizontalIDs);
            hIndex = 0;
        }
        return horizontalIDs[hIndex++];
    }
}

function getSubmission() {
    submitButton.addEventListener('click', function() {
        const color = colorSelect.value;
        const style = styleSelect.value === 'dashed' ? 'dashed' : 'solid';
        const orientation = orientationSelect.value;

        const lineId = getNextLineId(orientation);
        const currentLine = document.getElementById(lineId);
        if (currentLine) {
            applyLineStyle(currentLine, orientation, width, style, color);
            saveLine(lineId, orientation, style, color); // Save to cookies
        } else {
            console.error('No line found with ID:', lineId);
        }
    });
}
function createLines() {
    for (let i = 0; i < cols; i++) {
        const vLine = document.createElement('div');
        vLine.classList.add('line', 'vertical');
        vLine.id = `v-${i}`;
        vLine.style.left = `${(i / cols) * 100}%`;
        container.appendChild(vLine);
    }

    for (let j = 0; j < rows; j++) {
        const hLine = document.createElement('div');
        hLine.classList.add('line', 'horizontal');
        hLine.id = `h-${j}`;
        hLine.style.top = `${(j / rows) * 100}%`;
        container.appendChild(hLine);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createLines(); // This function should create divs and immediately restore their states if they exist
    restoreLines(); // Restore styles for existing lines
    getSubmission();
});
