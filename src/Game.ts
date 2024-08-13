import { Coord } from "./Coord.interface";
import { drawField, drawFigure, eraseFigure } from "./drawFunctions";
import Field from "./Field";
import { getRandomTemplate } from "./figureTemplates";


enum DIRECTION {
    LEFT,
    RIGHT, 
    DOWN
}

export class Game {
    private field: Field;
    private figure: Coord[];
    private speed: number;

    constructor(globalParams: any){
        this.figure = [];
        this.speed = globalParams.speed;
        this.field = new Field(globalParams.field.width, globalParams.field.height);
        drawField(globalParams.field.width, globalParams.field.height);
        this.initKeyPresses();
    }

    initKeyPresses(){
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



    rotateFigure(figure: Coord[]){
        // search distance to left top field corner
        let fieldX = Math.min(...(figure.map((coord: Coord) => coord.x)));
        const fieldY = Math.min(...(figure.map((coord: Coord) => coord.y)));

        // calculate figure without field
        const squareFigure = figure.map((coord: Coord) => ({
            x: coord.x - fieldX, 
            y: coord.y - fieldY
        }));


        // rotate figure
        let squareSize = 2; // square of 3 starting from 0
        let rotatedFigure = squareFigure.map((coord: Coord) => ({
            x: squareSize - coord.y,
            y: coord.x
        }));

        const isShiftNeeded: boolean = rotatedFigure.every((coord: Coord) => coord.x > 0)
        fieldX = isShiftNeeded ? fieldX - 1 : fieldX;

        // calculate figure coordinates in the field
        rotatedFigure = rotatedFigure.map((coord: Coord) => ({
            x: coord.x + fieldX, 
            y: coord.y + fieldY
        }));

        if(this.canFigureBePlaced(rotatedFigure)){
            this.figure = rotatedFigure;
            eraseFigure(figure);
            drawFigure(this.figure);
        }
    }


    hasLanded(figure: Coord[]): boolean {
        return figure.some((coord: Coord) => !this.field.canSquareBeOccupied({x: coord.x, y: coord.y + 1}));
    }



    moveFigure(direction: DIRECTION){
        let x = 0;
        let y = 0;

        if(direction === DIRECTION.LEFT){
            x = -1;
        } else if(direction === DIRECTION.RIGHT){
            x = 1;
        } else if(direction === DIRECTION.DOWN){
            y = 1;
        }

        let figure: Coord[] = structuredClone(this.figure);
        figure = this.shiftFigure(figure, x, y);
        
        if(this.canFigureBePlaced(figure)){
            eraseFigure(this.figure);
            this.figure = this.shiftFigure(this.figure, x, y);
            drawFigure(this.figure);
        }

    }

    clearRowsIfNeeded(){
        console.log(this.figure);
        const uniqueFilter = (value: any, index: number, array: any[]) => array.indexOf(value) === index;
        const rowsToCheck = this.figure.map((coord: Coord) => coord.y).filter(uniqueFilter);
        const rowsToClear = this.field.getFullRows(rowsToCheck);
        this.field.clearFullRows(rowsToClear);
    }

    


    processDropFigure(intervalId: number){
        this.reserveFigurePlace();
        this.clearRowsIfNeeded();
        this.createNewFigure();
        if(this.hasLanded(this.figure)){
            console.log('THE END');
            clearInterval(intervalId);
        }
    }

    reserveFigurePlace(){
        this.figure.forEach((coord: Coord)=> this.field.setSquare(coord, true));
    }

    

    canFigureBePlaced(figure: Coord[]){
        return figure.every((coord: Coord) => this.field.canSquareBeOccupied(coord));
    }


    createNewFigure(){
        const offsetX = Math.floor((this.field.width - 4) / 2);
        
        this.figure = this.shiftFigure(getRandomTemplate(), offsetX, 0);
        drawFigure(this.figure);
    }


    
    start(){
        this.createNewFigure();
        const intervalId = setInterval(() => {
            
            if(this.hasLanded(this.figure)){
                this.processDropFigure(intervalId);
            } else{
                this.moveFigure(DIRECTION.DOWN);
            }
        }, 1000)
    }

    shiftFigure(figure: Coord[], offsetX: number, offsetY: number): Coord[] {
        return figure.map(coord => ({ x: coord.x + offsetX, y: coord.y + offsetY }));
    }
}

