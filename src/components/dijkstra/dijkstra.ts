import {Vertex} from "../graph/vertex";
import {PriorityQueue} from "./priority-queue";
import {WeightedGraph} from "../graph/graph-generator";

export interface Path {
    path: string[];
    distance: number;
}

export interface Dijkstra<T> {
    findShortestPath(vertex1: T, vertex2: T): Path;
    findAllShortestPaths(vertex: T): Record<string, Path>;
}

export class ShortestPathAlgorithm implements Dijkstra<Vertex> {
    private adjacencyList = this.graph.getAdjacencyList();
    private nodes = Object.keys(this.adjacencyList);
    private vertices = this.graph.getVertices();

    constructor(private graph: WeightedGraph<Vertex>) {
    }

    findAllShortestPaths(vertex: Vertex): Record<string, Path> {
        const key = vertex.getKey();
        const allShortestPaths: Record<string, Path> = {};
        this.nodes.forEach(node => {
            if (node !== key) {
                const pathData = this.findShortestPath(vertex, this.vertices[node]);
                allShortestPaths[node] = pathData;
            }
        });
        return allShortestPaths;
    }

    findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
        const startNode = vertex1.getKey();
        const endNode = vertex2.getKey();

        const distances = this.initSingleSource(this.nodes, startNode);

        const visitedNodes = {};
        const priorityQueue = new PriorityQueue();

        priorityQueue.enqueue([startNode, 0]);
        while (!priorityQueue.isEmpty()) {
            let shortestStep = priorityQueue.dequeue();
            let currentNode = shortestStep[0];
            this.adjacencyList[currentNode].forEach(neighbor => {
                let distance = distances[currentNode] + neighbor.weight;
                if (distance < distances[neighbor.key]) {
                    distances[neighbor.key] = distance;
                    visitedNodes[neighbor.key] = currentNode;
                    priorityQueue.enqueue([neighbor.key, distance]);
                }
            });
        }
        let path;
        if (!this.adjacencyList[endNode].length) {
            path = [];
        } else {
            path = this.getPath(visitedNodes, endNode, startNode);
        }
        const shortestPath = {path: path, distance: distances[endNode]}
        console.log(shortestPath);
        return shortestPath;
    }

    /* additional methods */

    private initSingleSource(nodes: string[], startNode: string): Record<string, number> {
        const distances = {};
        distances[startNode] = 0;
        nodes.forEach(node => {
            if (node !== startNode) {
                distances[node] = Infinity
            }
        });
        return distances;
    }

    private getPath(visitedNodes: any, endNode: string, startNode: string): string[] {
        let path = [endNode];
        let lastStep = endNode;
        while(lastStep !== startNode) {
            path.unshift(visitedNodes[lastStep])
            lastStep = visitedNodes[lastStep]

        }
        return path;
    }

}
