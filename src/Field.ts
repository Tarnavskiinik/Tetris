import { Coord } from "./Coord.interface";

export default class Field {
    private field: boolean[][];
    public readonly width: number;
    public readonly height: number;

    
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

        
        this.field = new Array(height).fill(false);
        this.field.forEach((value, index)=>{
            this.field[index] = new Array(width).fill(false);
        })
        
    }

    canSquareBeOccupied(coord: Coord): boolean {
        return coord.x >= 0 && coord.x < this.width && coord.y < this.height;
    }
}