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

    let vLineCount = -1;
    let hLineCount = -1;

    let vStoredIds = [];
    let hStoredIds = [];

    function getSubmission() {
        submitButton.addEventListener('click', function() {
            const color = colorSelect.value;
            let style = styleSelect.value === 'dashed' ? 'dashed' : 'solid';
            const orientation = orientationSelect.value;

            if (orientation === 'vertical') {
                vLineCount++;
                if (vLineCount >= cols) {
                    resetLines(); // Reset lines when max is reached
                    vLineCount = 0; // Reset the count for vertical lines
                }
            } else {
                hLineCount++;
                if (hLineCount >= rows) {
                    resetLines(); // Reset lines when max is reached
                    hLineCount = 0; // Reset the count for horizontal lines
                }
            }

            let lineId = orientation === 'vertical' ? vLineCount : hLineCount;
            const currentLine = document.getElementById(`${orientation[0]}-${lineId}`);
            if (currentLine) {
                applyLineStyle(currentLine, orientation, width, style, color);
            } else {
                console.error('No line found with ID:', `${orientation[0]}-${lineId}`);
            }
        });
    }

    function applyLineStyle(line, orientation, width, style, color) {
        if (orientation === 'vertical') {
            line.style.borderLeft = `${width}px ${style} ${color}`;
            line.style.marginLeft = `-${width / 2}px`;
        } else {
            line.style.borderTop = `${width}px ${style} ${color}`;
            line.style.marginTop = `-${width / 2}px`;
        }
    }

    function resetLines() {
        container.innerHTML = ''; // Clear container
        vStoredIds = [];
        hStoredIds = [];
        createLines(); // Recreate lines
    }

    function createLines() {
        for (let i = 0; i < cols; i++) {
            const vLine = document.createElement('div');
            vLine.classList.add('line', 'vertical');
            let randomId = Math.floor(Math.random() * cols);
            while (vStoredIds.includes(randomId)) {
                randomId = Math.floor(Math.random() * cols);
            }
            vStoredIds.push(randomId);
            vLine.setAttribute("id", `v-${randomId}`);
            vLine.style.left = `${(i / cols) * 100}%`;
            container.appendChild(vLine);
        }

        for (let j = 0; j < rows; j++) {
            const hLine = document.createElement('div');
            hLine.classList.add('line', 'horizontal');
            let randomId = Math.floor(Math.random() * rows);
            while (hStoredIds.includes(randomId)) {
                randomId = Math.floor(Math.random() * rows);
            }
            hStoredIds.push(randomId);
            hLine.setAttribute("id", `h-${randomId}`);
            hLine.style.top = `${(j / rows) * 100}%`;
            container.appendChild(hLine);
        }
    }

    getSubmission();
    createLines(); // Initially create lines
});
