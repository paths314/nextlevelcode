document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('grid-container');
    const cols = 260; // Number of vertical lines
    const rows = 130; // Number of horizontal lines
    const width = 2;

    // Fetch user controls
    const colorSelect = document.getElementById('color');
    const styleSelect = document.getElementById('lineStyle');
    const orientationSelect = document.getElementById('orientation');
    const submitButton = document.getElementById('submitButton');

    var vLineCount = -1
    var hLineCount = -1

    let vStoredIds = []
    let hStoredIds = []

    function getSubmission(){
        submitButton.addEventListener('click', function(){
            const color = colorSelect.value
            let style
            if (styleSelect.value === 'dashed') {
                style = 'dashed';
            } else {
                style = 'solid';
            }

            const orientation = orientationSelect.value

            let lineId;
            if (orientation === 'vertical') {
                vLineCount++;
                lineId = vLineCount;
            } else {
                hLineCount++;
                lineId = hLineCount;
            }

            const currentLine = document.getElementById(`${orientation[0]}-${lineId}`);
            if (currentLine) {
                applyLineStyle(currentLine, orientation, width, style, color);
            } else {
                console.error('No line found with ID:', `${orientation[0]}-${lineId}`);
            }
        })
    }

    getSubmission()

    function applyLineStyle(line, orientation, width, style, color) {

        if (orientation === 'vertical') {
            line.style.borderLeft = `${width}px ${style} ${color}`;
            line.style.marginLeft = `-${width / 2}px`; // Center the line by adjusting the margin
        } else { // horizontal
            line.style.borderTop = `${width}px ${style} ${color}`;
            line.style.marginTop = `-${width / 2}px`; // Center the line by adjusting the margin
        }
    }

    // Create vertical lines with random IDs
    for (let i = 0; i < cols; i++) {
        const vLine = document.createElement('div');
        vLine.classList.add('line', 'vertical');
        let randomId;
        do {
            randomId = Math.floor(Math.random() * cols); // Use a larger range if necessary
        } while (vStoredIds.includes(randomId));
        vStoredIds.push(randomId);
        vLine.setAttribute("id", `v-${randomId}`);
        vLine.style.left = `${(i / cols) * 100}%`;
        container.appendChild(vLine);
    }

    // Create horizontal lines with random IDs
    for (let j = 0; j < rows; j++) {
        const hLine = document.createElement('div');
        hLine.classList.add('line', 'horizontal');
        let randomId;
        do {
            randomId = Math.floor(Math.random() * rows); // Use a larger range if necessary
        } while (hStoredIds.includes(randomId));
        hStoredIds.push(randomId);
        hLine.setAttribute("id", `h-${randomId}`);
        hLine.style.top = `${(j / rows) * 100}%`;
        container.appendChild(hLine);
    }

});
