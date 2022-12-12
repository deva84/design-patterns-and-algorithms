import {Vertex} from "./vertex";

export interface EdgeData {
    from: Vertex;
    to: Vertex;
    weight: number;
}

export class Edge {
    private readonly from: Vertex;
    private readonly to: Vertex;
    private readonly weight: number;

    constructor(from: Vertex, to: Vertex, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    getData(): EdgeData {
        return {from: this.from, to: this.to, weight: this.weight}
    }
}
