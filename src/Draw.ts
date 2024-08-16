import Field from "./Field";
import { Figure } from "./Figure";



export class Draw {

    private fieldId: string;
    private miniFieldId: string;

    constructor(fieldId: string, miniFieldId: string){
        this.fieldId = fieldId;
        this.miniFieldId = miniFieldId;
    }

    drawField(fieldInstance: Field) {
        const field: string[][] = fieldInstance.getField();
        const containerId: string = fieldInstance.containerId;
        let table: string = `
            <table>
        `;
    
        field.forEach((row, y) => {
            table += '<tr>';
            row.forEach((squareColor: string, x) => {
                let styleText = squareColor ? `style="background-color: ${squareColor}"` : '';
                table += `<td ${styleText} id="${containerId}-cell${x}-${y}"></td>`;
            });
            table += '</tr>';
        });
          table += '</table>';
    
          document.getElementById(containerId)!.innerHTML = table;
    }
    
    drawFigure(figure: Figure, isMiniContainer?: boolean) {
        // Рисуем Фигуру
        const containerName: string = isMiniContainer ? this.miniFieldId : this.fieldId;

        figure.coords.forEach((coord)=>{
            const element = document.getElementById(`${containerName}-cell${coord.x}-${coord.y}`);
            if(element){
                element.style.backgroundColor = figure.color;
            }
        })
        
    }

    drawScore(score: number){
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.innerText = `Score: ${score}`;
        }
    }

    drawHighScore(score: number){
        const highscoreElement = document.getElementById('highscore');
        if (highscoreElement) {
            highscoreElement.innerText = `Highscore: ${score}`;
        }
    }


    eraseFigure(figure: Figure, isMiniContainer?: boolean) {
        // Стираем фигуру
        const containerName: string = isMiniContainer ? this.miniFieldId : this.fieldId;

        figure.coords.forEach((coord) => {
            const element =  document.getElementById(`${containerName}-cell${coord.x}-${coord.y}`);
            if(element){
                element.style.backgroundColor = '';
            }
        });
    }
}
