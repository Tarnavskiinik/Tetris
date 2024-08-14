import { Coord } from "./Coord.interface";
import Field from "./Field";



export class Draw {

    private fieldId: string;
    private miniFieldId: string;

    constructor(fieldId: string, miniFieldId: string){
        this.fieldId = fieldId;
        this.miniFieldId = miniFieldId;
    }

    drawField(fieldInstance: Field) {
        const field: boolean[][] = fieldInstance.getField();
        const containerId: string = fieldInstance.containerId;
        let table: string = `
            <table>
        `;
    
        field.forEach((row, y) => {
            table += '<tr>';
            row.forEach((square, x) => {
                let classText = square ? 'class="figureCell"' : '';
                table += `<td ${classText} id="${containerId}-cell${x}-${y}"></td>`;
            });
            table += '</tr>';
        });
          table += '</table>';
    
          document.getElementById(containerId)!.innerHTML = table;
    }
    
    drawFigure(figure: Coord[], isMiniContainer?: boolean) {
        const containerName: string = isMiniContainer ? this.miniFieldId : this.fieldId;

        figure.forEach((coord)=>{
            const element = document.getElementById(`${containerName}-cell${coord.x}-${coord.y}`);
            if(element){
                element.classList.add('figureCell');
            }
        })
        
    }

    eraseFigure(figure: Coord[], isMiniContainer?: boolean) {
        const containerName: string = isMiniContainer ? this.miniFieldId : this.fieldId;

        figure.forEach((coord) => {
            const element =  document.getElementById(`${containerName}-cell${coord.x}-${coord.y}`);
            if(element){
                element.classList.remove('figureCell');
            }
        });
    }
}
