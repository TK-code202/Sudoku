import {generatePuzzle} from '../src/js/sudoku.js';

describe('Puzzle', () => {

  test('should correctly generate a number between 0 and 2', () => {
    const random = generatePuzzle();
    expect(random)<=(2);
  });

});