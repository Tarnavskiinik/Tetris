import { Coord } from "./Coord.interface";

export default class Field {
    private field: boolean[][];
    public readonly containerId: string;
    public readonly width: number;
    public readonly height: number;
    
    
    constructor(width: number, height: number, containerId: string){
        this.width = width;
        this.height = height;
        this.containerId = containerId;
        
        this.field = new Array(height).fill(false);
        this.field.forEach((value, index)=>{
            this.field[index] = new Array(width).fill(false);
        })
        
    }


    
    getField(): boolean[][]{
         // Получение текущего состояния игрового поля.
        return structuredClone(this.field);
    }

    canSquareBeOccupied(coord: Coord): boolean {
        // Проверка, может ли клетка быть занята (не выходит ли за границы и не занята ли уже).
        return coord.x >= 0 && coord.x < this.width && coord.y < this.height && !this.field[coord.y][coord.x];
    }

    setSquare(square: Coord, value: boolean){
         // Установка значения (занятости) клетки на игровом поле.
        this.field[square.y][square.x] = value;
    }


    getFullRows(rowsToCheck: number[]): number[] {
        // Получение списка полных рядов, которые должны быть очищены.
        return rowsToCheck.filter((row: number) => this.field[row].every((square: boolean) => square));
    }

    clearFullRows(rowNumbers: number[]){
        // Очистка указанных полных рядов и добавление новых пустых сверху.
        rowNumbers.forEach((rowNumber: number) => {
            this.field.splice(rowNumber, 1);
            this.field.unshift(new Array(this.width).fill(false));
        })
    }
}