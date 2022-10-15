export class Point {
    public x: number;
    public y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`
    }

    public distance(): number;
    public distance(other: Point): number;
    public distance(x: number, y: number): number;
    public distance(arg1?: Point | number, arg2?: number): number {
        if (arg1 && arg1 instanceof Point) {
            return this.calculateDistance(this, arg1);
        }

        if (arg1 && typeof(arg1) === 'number') {
            if (!arg2) {
                throw new Error('Second coordinate of a point is missing!')
            }
            return this.calculateDistance(this, new Point(arg1, arg2))
        }

        return this.calculateDistance(this, new Point(0, 0))
    }

    private calculateDistance(point1: Point, point2: Point): number {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
}
