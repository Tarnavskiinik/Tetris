import { Coord } from "./Coord.interface";

export function drawField(width: number, height: number) {
    let table: string = `
        <table>
    `;
    for (let i = 0; i < height; i++) {
        table += '<tr>';
        for (let j = 0; j < width; j++) {
          table += `<td id="cell${j}-${i}"></td>`;
        }
        table += '</tr>';
      }
      
      table += '</table>';


      document.getElementById('field')!.innerHTML = table;
}

export function drawFigure(figure: Coord[]) {
    figure.forEach((coord)=>{
        const element = document.getElementById(`cell${coord.x}-${coord.y}`);
        if(element){
            element.classList.add('figureCell');
        }
    })
    
}
export function eraseFigure(figure: Coord[]) {
    figure.forEach((coord) => {
        const element =  document.getElementById(`cell${coord.x}-${coord.y}`);
        if(element){
            element.classList.remove('figureCell');
        }
    });
}