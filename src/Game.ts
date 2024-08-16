import { Coord } from "./Coord.interface";
import { Draw } from "./Draw";
import Field from "./Field";
import { Figure } from "./Figure";
import { getRandomCoords, getRandomFigure } from "./figureTemplates";


enum DIRECTION {
    LEFT,
    RIGHT, 
    DOWN
}

const LOCALSTORAGE_HIGHSCORE_KEY = 'TetrisHighScore';

export class Game {
    private draw: Draw;
    private miniField: Field;
    private field: Field;
    private nextFigure: Figure;
    private figure: Figure;
    private speed: number;
    private score: number;
    private highScore: number;

    constructor(globalParams: any){
        // Инициализация игры с основными параметрами.
        this.draw = new Draw(globalParams.fieldContainerId, globalParams.miniFieldContainerId);
        this.nextFigure = {coords:[], color: ''};
        this.figure = {coords:[], color: ''};
        this.speed = globalParams.speed;
        this.miniField = new Field(4, 4, globalParams.miniFieldContainerId);
        this.field = new Field(globalParams.field.width, globalParams.field.height, globalParams.fieldContainerId);
        this.score = 0;
        this.highScore = 0;

        this.draw.drawField(this.field);
        this.draw.drawField(this.miniField);
        this.initKeyPresses();
    }

    initKeyPresses(){
        // Инициализация обработчиков нажатий клавиш для управления фигурой.
        document.addEventListener('keydown', (e) =>{
            switch(e.code){
                case 'ArrowLeft':
                    this.moveFigure(DIRECTION.LEFT);
                break;
                case 'ArrowRight':
                    this.moveFigure(DIRECTION.RIGHT);
                break;
                case 'ArrowDown':
                    this.moveFigure(DIRECTION.DOWN);
                break;
                case 'ArrowUp':
                    this.rotateFigure(this.figure);
                break;
            }
        })
    }



    rotateFigure(figure: Figure){
        // Поворот фигуры на 90 градусов.
        // search distance to left top field corner
        let fieldX = Math.min(...(figure.coords.map((coord: Coord) => coord.x)));
        const fieldY = Math.min(...(figure.coords.map((coord: Coord) => coord.y)));

        // calculate figure without field
        const squareFigure: Coord[] = figure.coords.map((coord: Coord) => ({
            x: coord.x - fieldX, 
            y: coord.y - fieldY
        }));


        // rotate figure
        let squareSize = 2; // square of 3 starting from 0
        let rotatedFigureCoords: Coord[] = squareFigure.map((coord: Coord) => ({
            x: squareSize - coord.y,
            y: coord.x
        }));

        const isShiftNeeded: boolean = rotatedFigureCoords.every((coord: Coord) => coord.x > 0)
        fieldX = isShiftNeeded ? fieldX - 1 : fieldX;

        // calculate figure coordinates in the field
        rotatedFigureCoords = rotatedFigureCoords.map((coord: Coord) => ({
            x: coord.x + fieldX, 
            y: coord.y + fieldY
        }));

        const rotatedFigure: Figure = {
            coords: rotatedFigureCoords,
            color: figure.color
        };

        if(this.canFigureBePlaced(rotatedFigure)){
            this.figure = rotatedFigure;
            this.draw.eraseFigure(figure);
            this.draw.drawFigure(this.figure);
        }
    }


    updateScore(lines: number){
        const scoreByLines: number[] = [0, 10, 25, 40, 70];
        this.score += scoreByLines[lines];
        this.draw.drawScore(this.score);
        
        if(this.highScore < this.score){
            this.highScore = this.score;
            this.draw.drawHighScore(this.highScore);
        }
    }

    hasLanded(figure: Figure): boolean {
        // Проверка, коснулась ли фигура нижней границы или другой фигуры.
        return figure.coords.some((coord: Coord) => !this.field.canSquareBeOccupied({x: coord.x, y: coord.y + 1}));
    }



    moveFigure(direction: DIRECTION){
        // Перемещение фигуры влево, вправо или вниз.
        let x = 0;
        let y = 0;

        if(direction === DIRECTION.LEFT){
            x = -1;
        } else if(direction === DIRECTION.RIGHT){
            x = 1;
        } else if(direction === DIRECTION.DOWN){
            y = 1;
        }

        let figure: Figure = structuredClone(this.figure);
        figure = this.shiftFigure(figure, x, y);
        
        if(this.canFigureBePlaced(figure)){
            this.draw.eraseFigure(this.figure);
            this.figure = this.shiftFigure(this.figure, x, y);
            this.draw.drawFigure(this.figure);
        }

    }

    clearRowsIfNeeded(){
        // Очистка полных рядов, если такие имеются.
        const uniqueFilter = (value: any, index: number, array: any[]) => array.indexOf(value) === index;
        const rowsToCheck: number[] = this.figure.coords.map((coord: Coord) => coord.y).filter(uniqueFilter);
        const rowsToClear = this.field.getFullRows(rowsToCheck);
        if(rowsToClear.length){
            this.field.clearFullRows(rowsToClear);
            this.draw.drawField(this.field);
            this.updateScore(rowsToClear.length);
        }
    }

    


    processDropFigure(intervalId: number){
        // Обработка завершения падения фигуры.
        this.reserveFigurePlace();
        this.clearRowsIfNeeded();
        this.createFigureInField(this.nextFigure);
        this.createNextFigure();

        if(this.hasLanded(this.figure)){
            console.log('THE END');
            clearInterval(intervalId);
            localStorage.setItem(LOCALSTORAGE_HIGHSCORE_KEY, String(this.highScore));
        }
    }

    reserveFigurePlace(){
        // Закрепление текущей фигуры на игровом поле.
        this.figure.coords.forEach((coord: Coord)=> this.field.setSquare(coord, this.figure.color));
    }

    

    canFigureBePlaced(figure: Figure){
        // Проверка, может ли фигура быть размещена на текущей позиции.
        return figure.coords.every((coord: Coord) => this.field.canSquareBeOccupied(coord));
    }


    createNextFigure(){
        // Создание следующей фигуры.
        let shiftedFigure = this.shiftFigure(this.nextFigure, 0, 1);
        this.draw.eraseFigure(shiftedFigure, true);
        
        this.nextFigure = getRandomFigure();
        shiftedFigure = this.shiftFigure(this.nextFigure, 0, 1);
        this.draw.drawFigure(shiftedFigure, true);
    }


    createFigureInField(figure: Figure){
        // Создание новой фигуры в центре верхней части поля.
        const offsetX = Math.floor((this.field.width - 4) / 2);
        const figureClone = structuredClone(figure);

        this.figure = this.shiftFigure(figureClone, offsetX, 0);
        this.draw.drawFigure(this.figure);
    }


    
    start(){
        // Запуск игры.  
        this.highScore = Number(localStorage.getItem(LOCALSTORAGE_HIGHSCORE_KEY)) || 0;
        this.draw.drawHighScore(this.highScore);
        
        this.createNextFigure();
        const randomFigure = getRandomFigure();
        this.createFigureInField(randomFigure);

        const intervalId = setInterval(() => {
            if(this.hasLanded(this.figure)){
                this.processDropFigure(intervalId);
            } else{
                this.moveFigure(DIRECTION.DOWN);
            }
        }, 1000)
    }

    shiftFigure(figure: Figure, offsetX: number, offsetY: number): Figure {
        return {
            coords: figure.coords.map(coord => ({ x: coord.x + offsetX, y: coord.y + offsetY })),
            color: figure.color
        }
    }
}

