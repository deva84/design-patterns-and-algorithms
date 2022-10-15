import {Point} from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    this.points = points;
    if (this.points.length < 3) {
      throw new Error('Shape requires minimum 3 points!')
    }
    this.color = color || 'green';
    this.filled = filled === undefined ? true : filled;
  }

  public toString(): string {
    const convertedListOfPoints = this.points.map(point => {
      const pointCopy = point;
      return `(${pointCopy.x}, ${pointCopy.y})`
    }).join(', ');
    return `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points: ${convertedListOfPoints}.`;
  }

  public getPerimeter(): number {
    let perimeter = 0;
    for (let i = 0; i < this.points.length; i++) {
      if (i < this.points.length - 1) {
        perimeter += this.points[i].distance(this.points[i + 1])
      } else {
        perimeter += this.points[i].distance(this.points[0])
      }
    }
    return perimeter;
  }

  abstract getType(): string;
}
