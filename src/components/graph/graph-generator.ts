import {Vertex} from "./vertex";

export interface WeightedGraph<T> {
    addVertex(vertex: Vertex): void;
    addEdge(vertex1: T, vertex2: T, weight: number): void;

    /* additional required methods */
    getAdjacencyList(): AdjacencyList;
    getVertices(): Record<string, Vertex>;
}

export type AdjacencyList = {
    [key: string]: AdjacentNodeData[];
}

interface AdjacentNodeData {
    key: string;
    weight: number;
}

export class GraphGenerator implements WeightedGraph<Vertex> {
    private adjacencyList: AdjacencyList = {};
    private vertices: Record<string, Vertex> = {};

    addVertex(vertex: Vertex): void {
        const key = vertex.getKey();
        if (!this.adjacencyList[key]) {
            this.adjacencyList[key] = [];
            this.vertices[key] = vertex;
        }
    }

    addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
        let nodeData: AdjacentNodeData;
        const key1 = vertex1.getKey();
        const key2 = vertex2.getKey();

        if (!this.adjacencyList[key1]) {
            this.addVertex(vertex1);
        }
        nodeData = {key: key2, weight: weight}
        this.adjacencyList[vertex1.getKey()].push(nodeData);

        if (!this.adjacencyList[key2]) {
            this.addVertex(vertex2);
        }
        nodeData = {key: key1, weight: weight}
        this.adjacencyList[vertex2.getKey()].push(nodeData);
    }

    getAdjacencyList(): AdjacencyList {
        return this.adjacencyList;
    }

    getVertices(): Record<string, Vertex> {
        return this.vertices;
    }
}
