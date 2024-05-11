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

    // var i

    // var color
    // var style
    // var orientation

    var currentVLine = document.querySelector(`v-${vLineCount}`)
    var currentHLine = document.querySelector(`h-${hLineCount}`)


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

            if (orientation === 'vertical') {
                vLineCount++;
                const currentVLine = document.getElementById(`v-${vLineCount}`);
                applyLineStyle(currentVLine, orientation, width, style, color);
            
            } else {
                hLineCount++;
                const currentHLine = document.getElementById(`h-${hLineCount}`);
                applyLineStyle(currentHLine, orientation, width, style, color);
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

    // if statement

    // Create vertical lines
    for (let i = 0; i < cols; i++) {
        // have separate counts here and for horizontal, depending on what they chose, increase the count by 1 and replace i with that no.
        const vLine = document.createElement('div');
        vLine.classList.add('line', 'vertical');

        vLine.setAttribute("id", `v-${i}`)
        vLine.style.left = `${(i / cols) * 100}%`;

        container.appendChild(vLine);

        // code that shuffles the vertical lines either before the child is appended but after its id is set
        // or code that shuffles all the created children of the parent AFTER the children are appended
    }

    // Create horizontal lines
    for (let j = 0; j < rows; j++) {
        const hLine = document.createElement('div');
        hLine.classList.add('line', 'horizontal');
        hLine.setAttribute("id", `h-${j}`)
        hLine.style.top = `${(j / rows) * 100}%`;
        container.appendChild(hLine);

        // shuffles the horizontal lines 
    }

    // // Convert NodeList of divs to an array
    // const divsArray = Array.from(container.children);

    // // Function to shuffle an array
    // function shuffleArray(array) {
    //     for (let i = array.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    //     }
    //     return array;
    // }

    // // Shuffle the array of divs
    // const shuffledDivs = shuffleArray(divsArray);

    // // Clear container
    // container.innerHTML = '';

    // // Append shuffled divs back to the container
    // shuffledDivs.forEach(div => container.appendChild(div));

    // once you've finished appending all the children, shuffle the inner contents of the div that they're in
});





    // // Create vertical lines
    // for (let i = 0; i < cols; i++) {
    //     // have separate counts here and for horizontal, depending on what they chose, increase the count by 1 and replace i with that no.
    //     const vLine = document.createElement('div');
    //     vLine.classList.add('line', 'vertical');

    //     // create random number
    //     randomFun = Math.floor(Math.random()*261)

    //     // array to store previous random nums
    //     storedId = []

    //     if(storedId.includes(randomFun)){
    //         randomFun = Math.floor(Math.random()*261)
    //     }
    //     else{
    //         storedId.push(randomFun)
    //         vLine.setAttribute("id", `v-${randomFun}`)
    //         vLine.style.left = `${(i / cols) * 100}%`;

    //         container.appendChild(vLine);
    //     }
        
    // }

    // // Create horizontal lines
    // for (let j = 0; j < rows; j++) {
    //     const hLine = document.createElement('div');
    //     hLine.classList.add('line', 'horizontal');
    //     hLine.setAttribute("id", `h-${j}`)
    //     hLine.style.top = `${(j / rows) * 100}%`;
    //     container.appendChild(hLine);

    //     // shuffles the horizontal lines 
    // }




// create a function for each new submission
    // event listener for the submit button that also contains:
        // get, store variables for color and solid vs dashed
        // if statement to add to linecount (if portrait add 1 to vlinecount, else add 1 to hlinecount)
        // get new count


// in the applylinestyle function's if statement:
    // get updated count from new submission function
    // 

