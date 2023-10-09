const DEFAULT_COLOR = `#333333`;
const DEFAULT_SIZE = 16;
const sectionElement = document.querySelector("section");
const button = document.createElement("button");
const toggleElementGridLines = document.createElement("h4");
const toggleRandomColor = document.createElement("h3");
const toggleElementEraser = document.createElement("h5");
const header = document.querySelector("header");
const eraser = document.createElement("h1");
// Apending child

sectionElement.classList.add("section-container");
header.appendChild(button);
header.appendChild(toggleElementGridLines);
header.appendChild(toggleRandomColor);
header.appendChild(toggleElementEraser);
header.appendChild(eraser);
// EventListeners

button.addEventListener("click", updateGridSize);

toggleElementGridLines.addEventListener("click", handleGridLines);
toggleRandomColor.addEventListener("click", handleColorChange);
toggleElementEraser.addEventListener("click", handleClear);
eraser.addEventListener("click", handleEraseOneItem);

// let values

let allGridItems;
let toggleClear = false;
let toggleGridLines = false;
let isMouseDown = false;
let randomColor;

// Temp array

const arrayOfColors = ["blue", "yellow", "green", "black"];

// innerHTML

eraser.innerHTML = "eraser";
button.innerHTML = "change size";
toggleElementGridLines.innerHTML = "Toggle Grid Lines";
toggleRandomColor.innerHTML = "Toggle Random Color";
toggleElementEraser.innerHTML = "Toggle Clear";

// Functions

function createGrid(numSquaresPerSide) {
  sectionElement.innerHTML = "";
  const maxGridWidth = 500;
  let squareSize;

  if (numSquaresPerSide === 1) {
    squareSize = `${maxGridWidth}px`;
  } else {
    squareSize = `${maxGridWidth / numSquaresPerSide}px`;
  }

  sectionElement.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, ${squareSize})`;
  sectionElement.style.gridTemplateRows = `repeat(${numSquaresPerSide}, ${squareSize})`;

  for (let i = 0; i < numSquaresPerSide * numSquaresPerSide; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid-div");
    grid.addEventListener("mousedown", handleOnClick);
    grid.addEventListener("mouseenter", handleOnDrag);
    sectionElement.appendChild(grid);
  }
  allGridItems = document.querySelectorAll("div");

  if (toggleGridLines) {
    handleGridLines();
  }
}
createGrid(DEFAULT_SIZE);

function handleOnClick(event) {
  isMouseDown = true;
  event.target.classList.add("grid-div__active");
}

function handleOnDrag(event) {
  if (isMouseDown) {
    event.target.classList.add("grid-div__active");
  }
}

function updateGridSize() {
  const promptEvent = prompt("change this");
  const text = parseInt(promptEvent);
  createGrid(text);
}

function handleClear() {
  toggleClear = true;
  allGridItems.forEach((grid) => {
    grid.classList.remove(...arrayOfColors);
    grid.classList.remove("grid-div__active");
  });
}
let test;
function handleEraseOneItem(event) {
  console.log("event");
}

// need to update to make more clean
function handleColorChange() {
  randomColor = Math.floor(Math.random() * arrayOfColors.length);
  allGridItems.forEach((grid) => {
    mouseDownForSqaure = false;
    console.log(arrayOfColors[randomColor]);
    grid.addEventListener("mousedown", () => {
      mouseDownForSqaure = true;
      grid.classList.remove("grid-div__active");
      grid.classList.add(arrayOfColors[randomColor]);
    });
    grid.addEventListener("mouseenter", () => {
      if (mouseDownForSqaure) {
        grid.classList.remove("grid-div__active");
        grid.classList.add(arrayOfColors[randomColor]);
        console.log(arrayOfColors[randomColor]);
      }
    });
  });
}
allGridItems = document.querySelectorAll("div");

function handleGridLines() {
  toggleGridLines = !toggleGridLines;
  console.log("grid line");
  console.log(toggleGridLines);
  allGridItems.forEach((grid) => {
    if (toggleGridLines) {
      grid.classList.add("toggle-grid__lines");
    } else {
      grid.classList.remove("toggle-grid__lines");
    }
  });
}

document.addEventListener("mouseup", () => {
  mouseDownForSqaure = false;
  isMouseDown = false;
});
