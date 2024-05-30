class Cell {
  constructor(
    name = "Placeholder",
    life = 0,
    lifeMax = 0,
    sp1C = 0,
    sp1M = 0,
    sp2C = 0,
    sp2M = 0,
    sp3C = 0,
    sp3M = 0,
    sp4C = 0,
    sp4M = 0,
    sp5C = 0,
    sp5M = 0,
    sp6C = 0,
    sp6M = 0,
    sp7C = 0,
    sp7M = 0,
    sp8C = 0,
    sp8M = 0,
    sp9C = 0,
    sp9M = 0,
    strS = "+0",
    strT = "+0",
    dexS = "+0",
    dexT = "+0",
    conS = "+0",
    conT = "+0",
    intS = "+0",
    intT = "+0",
    wisS = "+0",
    wisT = "+0",
    chaS = "+0",
    chaT = "+0",
    other = "Lorem ipsum",
    level = 0,
    exp = 0,
    ac = 0,
    spAttRoll = "+0",
    spSavDc = 0,
    name1 = "Placeholder",
    roll1 = "+0",
    dam1 = "Placeholder",
    name2 = "Placeholder",
    roll2 = "+0",
    dam2 = "Placeholder",
    name3 = "Placeholder",
    roll3 = "+0",
    dam3 = "Placeholder"
  ) {
    Object.assign(this, {
      name,
      life,
      lifeMax,
      sp1C,
      sp1M,
      sp2C,
      sp2M,
      sp3C,
      sp3M,
      sp4C,
      sp4M,
      sp5C,
      sp5M,
      sp6C,
      sp6M,
      sp7C,
      sp7M,
      sp8C,
      sp8M,
      sp9C,
      sp9M,
      strS,
      strT,
      dexS,
      dexT,
      conS,
      conT,
      intS,
      intT,
      wisS,
      wisT,
      chaS,
      chaT,
      other,
      level,
      exp,
      ac,
      spAttRoll,
      spSavDc,
      name1,
      roll1,
      dam1,
      name2,
      roll2,
      dam2,
      name3,
      roll3,
      dam3,
    });
  }
}

//Initialises the cells
let allCells = document.querySelectorAll(".cell");
let array = [];
for (let i = 0; i < allCells.length; i++) {
  let newCell = new Cell();
  array.push(newCell);
}
populateCells(array);


//Long rest button code, sets life and spell slots to their maximum as in the cells
function longRest(event) {
  let cell = event.currentTarget.parentElement.parentElement;
  let valueArr = [
    ["life", "lifeMax"],
    ["sp1C", "sp1M"],
    ["sp2C", "sp2M"],
    ["sp3C", "sp3M"],
    ["sp4C", "sp4M"],
    ["sp5C", "sp5M"],
    ["sp6C", "sp6M"],
    ["sp7C", "sp7M"],
    ["sp8C", "sp8M"],
    ["sp9C", "sp9M"],
  ];
  for (let i = 0; i < valueArr.length; i++) {
    cell.querySelector(`#${valueArr[i][0]}`).value = cell.querySelector(
      `#${valueArr[i][1]}`
    ).value;
  }
}

document
  .querySelectorAll(".long-rest")
  .forEach((ele) => ele.addEventListener("click", longRest));



//Download button code
document.getElementById("download").onclick = download;
function download(e) {
  let text = JSON.stringify(grabCells());
  let filename = "characters.json";
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


//Import button code
document.getElementById("import").onclick = function () {
  var files = document.getElementById("selectFiles").files;
  console.log(files);
  if (files.length <= 0) {
    return false;
  }

  var fr = new FileReader();

  fr.onload = function (e) {
    console.log(e);
    var result = JSON.parse(e.target.result);
    console.log(result);
    populateCells(result);
  };

  fr.readAsText(files[0]);
};


//Takes in an array of objects, and populates the values of the cells' stats
function populateCells(data) {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < Object.keys(data[i]).length; j++) {
      cells[i].querySelector(`#${Object.keys(data[i])[j]}`).value =
        data[i][Object.keys(data[i])[j]];
    }
  }
}


// Builds an array of objects with the values of the cells' stats, ready for saving to a JSON file
function grabCells() {
  let cells = document.querySelectorAll(".cell");
  let objArr = [];

  for (let i = 0; i < cells.length; i++) {
    let cellObj = new Cell();
    for (let j = 0; j < Object.keys(cellObj).length; j++) {
      cellObj[Object.keys(cellObj)[j]] = cells[i].querySelector(
        `#${Object.keys(cellObj)[j]}`
      ).value;
    }
    objArr.push(cellObj);
  }
  return objArr;
}
