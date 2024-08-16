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
    // '#994033',
    // '#997433',
    // '#5d9933',
    // '#33995f',
    // '#339986',
    // '#337e99',
    // '#335699',
    // '#663399', 
    // '#7f3399',
    // '#99336f',
    // '#993348'

    '#ae241e',
    '#ae471e',
    '#ae841e',
    '#a1ae1e',
    '#5aae1e',
    '#1eae7f',
    '#1eaeac',
    '#1e78ae',
    '#1e46ae',
    '#561eae',
    '#981eae',

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