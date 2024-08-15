import { Coord } from './Coord.interface';
import { Figure } from './Figure';



const templates: Coord[][] = [
    // stick
    [
        {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}
    ],
    // square
    [
        {x:1, y:0}, {x:2, y:0}, {x:1, y:1}, {x:2, y:1}
    ],
    // triangle
    [
        {x:1, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}
    ],
    // leftduck
    [
        {x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}
    ],
     // rightduck
     [
        {x:2, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}
     ],
    // rightL
    [
        {x:2, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1} 
    ],
     // leftL
    [
        {x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1} 
    ],
    
];

const colors: string[] = [
    '#00FFFF',
    '#0000FF',
    '#8A2BE2',
    '#A52A2A',
    '#DC143C',
    '#FF8C00',
    '#006400',
    '#2F4F4F',
    '#FF00FF',
    '#7CFC00',
    '#800000', 
    '#000080',
    '#8B4513',
    '#FFFF00'
];


export function getRandomColor(): string{
    const color: string = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

export function getRandomCoords(): Coord[] {
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template;
}

export function getRandomFigure(): Figure {
    return {
        coords: getRandomCoords(),
        color: getRandomColor()
    };
}