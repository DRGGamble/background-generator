// ****************************************************************************
// Background Generator
// 
// Overview:
// This web page/viewport allows a user to select colours from two colour pickers 
// to generate a background. 
// The initial background colour is defaulted in the HTML.
// A button has been added to randomly select HEX and RGBA colours and to 
// display a linear gradient notation for both each time the button is pressed.
// ****************************************************************************
// 
// ****************************************************************************
// Variable declarations
// ****************************************************************************
//
// Example of including lodash in my script.
// const _ = require('lodash');
// const array = [1, 2, 3, 4, 5, 6, 7, 8]
// console.log('answer', _.without(array, 3));
//
const css = document.querySelector("h3");
const [colour1, colour2] = document.querySelectorAll(".colour");
const body = document.querySelector(".gradient");
const generateBtn = document.querySelector("button");
const gradientInfo = document.querySelector(".gradientinfo");
const colourPreview = document.querySelector(".colourpreview");
// 
// ****************************************************************************
// Function declarations
// ****************************************************************************
// 
// ---------------------------------------
// Function to generate graadient
// ---------------------------------------
generateGradient = () => {
// Generate between 2 and 4 Hex colours
const colourCount = Math.floor(Math.random() * 3) + 2;
const hexColours = [];
                
    // Get a random colour and add to hexColours array
    for (let i = 0; i < colourCount; i++) {
        hexColours.push(getRandomColour());
    }

    // Generate random angle for gradient direction
    const angle = Math.floor(Math.random() * 360);
                
    // Create gradient string
    const rgbaNotationtring = `linear-gradient(${angle}deg, ${hexColours.join(', ')})`;
                
    // Apply to body
    document.body.style.background = rgbaNotationtring;
                
    // Update info display
    gradientInfo.textContent = rgbaNotationtring;
                
    // Update colour preview
    updateColourPreview(hexColours);

    // Generate RGBA gradient notation and apply it to the css.textContent for the empty <h3></h3> tag
    rgbaNotation = generateGradientNotations(hexColours, angle);
    css.textContent = `${rgbaNotation};`;
}
// ---------------------------------------
// Function to get random colour
// ---------------------------------------
getRandomColour = () => {
    // Generate random hex colour
    const letters = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}
// ---------------------------------------
// Function to update colour preview 
// ---------------------------------------           
updateColourPreview = (hexColours) => {
    colourPreview.innerHTML = '';
                
    hexColours.forEach(colour => {
        const colourBox = document.createElement('div');
        colourBox.className = 'colourbox';
        colourBox.style.background = colour;
        colourPreview.appendChild(colourBox);
        });
}
// ---------------------------------------
// Function to set gradient
// ---------------------------------------
setGradient = () => {
    // Convert Hex to RGBA notation
    body.style.background = _linearGradient();
    // Use Hex notation from colour picker(s)
    gradientInfo.textContent = _linearGradient();
    // Assign RGBA notation to css.textContent (<h3></h3>)
    css.textContent = `${body.style.background};`;
}
// ---------------------------------------
// Function for linear gradient notation
// ---------------------------------------
_linearGradient = () => {
    return `linear-gradient(to right, ${colour1.value}, ${colour2.value})`;
}
// ---------------------------------------
// Function to generate gradient notation for RGBA colours
// ---------------------------------------
generateGradientNotations = (hexColours, angle) => {

    // Convert hex to RGBA
    const rgbaColours = hexColours.map(hexToRgba);
    
    // Generate gradient notations
    const rgbaNotation = generateLinearGradient(rgbaColours, angle);

    return rgbaNotation;
}
// ---------------------------------------
// Function to convert hex to RGBA
// ---------------------------------------
hexToRgba = (hex) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Validate hex format
    if (!/^([0-9A-F]{3}){1,2}$/i.test(hex)) {
        throw new Error(`Invalid hex colour: ${hex}`);
    }
    
    // Parse hex values
    let r, g, b;
    
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }
    
    return `rgba(${r}, ${g}, ${b}, 1)`;
}
// ---------------------------------------
// Function to generate linear gradient with random angle/degree
// ---------------------------------------
generateLinearGradient = (colours, degree) => {
    let gradient = `linear-gradient(${degree}deg`;
    
    colours.forEach((colour, index) => {
        const position = index === 0 ? 0 : index === colours.length - 1 ? 100 : Math.round((index / (colours.length - 1)) * 100);
        gradient += `, ${colour} ${position}%`;
    });
    
    gradient += ')';
    return gradient;
}
// 
// ****************************************************************************
// Listeners
// ****************************************************************************
colour1.addEventListener('input', setGradient);
colour2.addEventListener('input', setGradient);
generateBtn.addEventListener('click', generateGradient);
// 
// ****************************************************************************
// Executable function on initial load and refresh
// ****************************************************************************
// Set gradient
setGradient();