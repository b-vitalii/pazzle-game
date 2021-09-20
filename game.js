class Game {
  constructor() {
    this.defaultValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null];
    this.cells = [];
    this.steps = 0;
    this.gameField = document.getElementById("game");
    this.newGame = document.querySelector(".new_btn");
  }

  init() {
    this.steps = 0;
    this.getRandomizedValues(this.defaultValues);
    this.drawGameField();
    this.addEvents();
  }

  getRandomizedValues() {
    let randomValues = [...this.defaultValues];
    let x = 0;
    let y = 0;

    this.cells = randomValues
      .sort(() => Math.random() - 0.5)
      .map((value) => {
        if (x === 4) {
          x = 0;
          y++;
        }

        return {
          value: value,
          x: x++,
          y: y,
        };
      });
  }

  drawGameField() {
    const sizeField = 150;
    let cellsHTML = "";

    this.cells.forEach((item, i) => {
      let g = `
          <g data-id="${i}" class="cell-group">
              <rect 
                class="${item.value ? "cell-square" : "cell-square-empty"}" 
                x="${item.x * sizeField}" 
                y="${item.y * sizeField}" 
                width="${sizeField}" 
                height="${sizeField}">
              </rect>
              <text 
                class="cell-text" 
                text-anchor="middle" 
                x="${item.x * sizeField + sizeField / 2}" 
                y="${item.y * sizeField + sizeField / 2 + 10}">
                  ${item.value ? item.value : ""}
              </text>
          </g>
        `;
        cellsHTML += g;
    });

    this.gameField.innerHTML = cellsHTML;
  }

  addEvents() {
      this.newGame.addEventListener("click", () => this.init())
      this.gameField.addEventListener("click", (e) => {
      let target = e.target;

      while (target != "svg") {
        if (target.tagName == "g") {
          this.clickCell(target.dataset.id);
          return;
        }
        target = target.parentNode;
      }
    });
  }

  clickCell(id) {
    let cell = this.cells[id];
    let emptyCell = this.cells.find((cell) => cell.value === null);
    if (Math.abs(cell.x - emptyCell.x) + Math.abs(cell.y - emptyCell.y) === 1) {
      emptyCell.value = cell.value;
      cell.value = null;
      this.steps++;
      this.drawGameField();
      this.checkWin();
    }
  }

  checkWin() {
    let resultValues = this.cells.map((cell) => cell.value);
    if (this.defaultValues.join(',') === resultValues.join(',')) {
      return alert(`Congratulations, you won in ${this.steps} steps. Press new game to play again?`)
    }
  }
}

new Game().init();
