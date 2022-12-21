import {Node} from "./node";

export class PriorityQueue {
    private nodes: Node[] = [];

    enqueue(node: Node): Node[] {
        this.nodes.push(node);
        this.bubbleUp();

        return this.nodes;
    }

    private bubbleUp(): void {
        let newNodeIndex = this.nodes.length - 1;
        while (newNodeIndex > 0) {

            /* since it's a heap, parentNode index is calculated by formula (n-1)/2 rounded down */
            let parentIndex = Math.floor((newNodeIndex - 1)/2);
            if (this.nodes[parentIndex].priority < this.nodes[newNodeIndex].priority) {
                this.swap(newNodeIndex, parentIndex);

                newNodeIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    private swap(nodeIndex1: number, nodeIndex2: number): Node[] {
        let temp = this.nodes[nodeIndex1];
        this.nodes[nodeIndex1] = this.nodes[nodeIndex2];
        this.nodes[nodeIndex2] = temp;
        return this.nodes;
    }

    dequeue(): Node {
        const lastNodeIndex = this.nodes.length - 1;
        this.swap(0, lastNodeIndex);
        const poppedNode = this.nodes.pop();

        if (this.nodes.length > 1) {
            this.bubbleDown();
        }

        return poppedNode;
    }

    private bubbleDown(): void {
        let parentIndex = 0;
        const firstNodePriority = this.nodes[0].priority;
        const lastNodeIndex = this.nodes.length - 1;

        while(true) {
            /* since it's a heap, leftChild index = 2n + 1, rightChild index = 2n + 2 */
            let leftChildIndex = 2 * parentIndex + 1;
            let rightChildIndex = 2 * parentIndex + 2;

            let leftChildPriority, rightChildPriority: number | undefined;
            let indexToSwap = null;

            if (leftChildIndex <= lastNodeIndex) {
                leftChildPriority = this.nodes[leftChildIndex].priority;

                if (leftChildPriority > firstNodePriority) {
                    indexToSwap = leftChildIndex;
                }
            }

            if (rightChildIndex <= lastNodeIndex) {
                rightChildPriority = this.nodes[rightChildIndex].priority;

                let firstReasonToSwap = indexToSwap === null && (rightChildPriority > firstNodePriority);
                let secondReasonToSwap = indexToSwap !== null && (rightChildPriority > leftChildPriority);

                if (firstReasonToSwap || secondReasonToSwap) {
                    indexToSwap = rightChildIndex;
                }
            }

            if (indexToSwap === null) break;

            this.swap(parentIndex, indexToSwap);
            parentIndex = indexToSwap;
        }
    }

    getNodeList(): Node[] {
        return this.nodes;
    }
}
