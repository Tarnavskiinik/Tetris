import { Coord } from './Coord.interface';



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

export function getRandomTemplate(): Coord[] {
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template;
}