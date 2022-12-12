import {Vertex} from "./components/graph/vertex";
import {Edge} from "./components/graph/edge";
import {GraphGenerator, WeightedGraph} from "./components/graph/graph-generator";
import {ShortestPathAlgorithm} from "./components/dijkstra/dijkstra";

const vertices = [
    new Vertex('1'),
    new Vertex('2'),
    new Vertex('3'),
    new Vertex('4'),
    new Vertex('5'),
];

const edges = [
    new Edge(vertices[0], vertices[3], 3),
    new Edge(vertices[0], vertices[1], 5),
    new Edge(vertices[0], vertices[2], 4),
    new Edge(vertices[1], vertices[3], 6),
    new Edge(vertices[1], vertices[2], 5),
];

const graph: WeightedGraph<Vertex> = new GraphGenerator();

vertices.forEach(vertex => graph.addVertex(vertex));
edges.forEach(edge => graph.addEdge(edge.getData().from, edge.getData().to, edge.getData().weight));

console.log('Weighted Graph Adjacency List:\n', graph.getAdjacencyList());

const dijkstra = new ShortestPathAlgorithm(graph);

console.log('\nShort path\n');
dijkstra.findShortestPath(vertices[3], vertices[2]);
dijkstra.findShortestPath(vertices[0], vertices[4]);
dijkstra.findShortestPath(vertices[0], vertices[0]);

console.log('\nAll shortest paths\n');
dijkstra.findAllShortestPaths(vertices[3]);
