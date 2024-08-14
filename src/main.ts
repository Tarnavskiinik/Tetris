import './style.css';
import { Game } from './Game';


const globalParams = {
  field: {
    width: 10,
    height: 25
  },
  fieldContainerId: 'field',
  miniFieldContainerId: 'mini-field',
  speed: 1
};

const game = new Game(globalParams);

game.start();



