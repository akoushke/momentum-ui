import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#Symbol Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register Symbol', function() {
    expect(board._shapeList.symbol).toBeTruthy();
  });

});

