import {PriorityQueue} from "./priority-queue";
import {Node} from "./node";

export class JobRunner {
    // required for circular job running;
    private heapReservoir: Node[];

    constructor(private priorityQueue: PriorityQueue) {
    }

    private generateNodeValue(): number {
        return Math.floor(Math.random() * 1000) + 1;
    }

    private generateNodePriority(): number {
        return Math.floor(Math.random() * 5) + 1;
    }

    private createNode(): Node {
        const value = this.generateNodeValue();
        const priority = this.generateNodePriority();
        return new Node(value, priority)
    }

    private createHeap(numberOfNodes: number): void {
        while (this.priorityQueue.getNodeList().length < numberOfNodes) {
            const node = this.createNode();
            this.priorityQueue.enqueue(node);
        }
        this.heapReservoir = [...this.priorityQueue.getNodeList()];
    }

    private runJobs(): void {
        while (this.priorityQueue.getNodeList().length > 0) {
            let node = this.priorityQueue.dequeue();
            node.postPriority();
        }
        console.log('-----------   ------------');
        console.log('All jobs are done!');
        console.log('-----------   ------------');

        this.refillPriorityQueue();
    }

    private refillPriorityQueue(): void {
        this.heapReservoir.forEach(node => {
            this.priorityQueue.enqueue(node);
        });
    }

    startCircularRunner(numberOfJobs: number, numberOfCycles = 3): void {
        this.createHeap(numberOfJobs);
        // .bind is used due to context being lost in repeat method
        this.repeat(this.runJobs.bind(this), numberOfCycles);
    }

    private repeat(callback, times) {
        callback();
        times && --times && this.repeat(callback, times);
    }
}
