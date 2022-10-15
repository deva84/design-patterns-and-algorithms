import { Shape } from './Shape';
import {Point} from "./Point";

export class Triangle extends Shape {
    public v1: Point;
    public v2: Point;
    public v3: Point;

    constructor(v1: Point, v2: Point, v3: Point);
    constructor(v1: Point, v2: Point, v3: Point, color: string, filled: boolean);
    constructor(v1: Point, v2: Point, v3: Point, color?: string, filled?: boolean) {
        super([v1, v2, v3], color, filled);
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.color = color;
        this.filled = filled;
    }

    public toString(): string {
        return `Triangle[v1=(${this.v1.x}, ${this.v1.y}),v2=(${this.v2.x}, ${this.v2.y}),v3=(${this.v3.x}, ${this.v3.y})]`;
    }

    public getType(): string {
        // comparison as floats is a requirement described in Triangle.spec.ts line 21
        const a = parseFloat(this.v1.distance(this.v2).toFixed(2));
        const b = parseFloat(this.v2.distance(this.v3).toFixed(2));
        const c = parseFloat(this.v3.distance(this.v1).toFixed(2));
        const sidesWithDifferentLength = new Set([a, b, c]);

        return this.getTypeName(sidesWithDifferentLength.size);
    }

    private getTypeName(number: number): string {
        if (number === 1) {
            return 'equilateral triangle';
        }
        if (number === 2) {
            return 'isosceles triangle';
        }
        return 'scalene triangle';
    }
}
