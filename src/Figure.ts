export default class Figure{
    private figure: boolean[][];
    
    constructor(template: boolean[][]){
        this.figure = structuredClone(template);
    }
}