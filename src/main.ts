import './style.css';
import { drawField, drawFigure } from './drawFunctions';
import Field from './Field';
import { getRandomTemplate } from './figureTemplates';
import { Coord } from './Coord.interface';
import { Game } from './Game';


const globalParams = {
  field: {
    width: 10,
    height: 25
  },
  speed: 1
};

const game = new Game(globalParams);

game.start();



