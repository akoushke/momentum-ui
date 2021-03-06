import Shape from '../shape/index';

class Rect extends Shape {

  constructor (data, config) {
    super();
    super.init(data, config);
  }

  renderSelection(selection) {
    const stackData = {
      points: {}
    };
    const generator = this.Config.generator;
    let x, y, w, h;
    selection
      .attr('x', (d, i) => {
        x = this.fVal(generator.x, d, i, 0);
        stackData.points.x = x;
        return x;
      })
      .attr('y', (d, i) => {
        y = this.fVal(generator.y, d, i, 0);
        stackData.points.y = y;
        return y;
      })
      .attr('width', (d, i) => {
        w = this.fVal(generator.w, d, i, 0);
        stackData.points.w = w;
        return w;
      })
      .attr('height', (d, i) => {
        h = this.fVal(generator.h, d, i, 0);
        stackData.points.h = h;
        return h;
      });
    this.Stack.push(stackData);
    return selection;
  }

}

Rect.prototype.ShapeName = 'rect';
Rect.prototype.DomName = 'rect';
Rect.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    attr: {

    }
  }
};

export default Rect;

