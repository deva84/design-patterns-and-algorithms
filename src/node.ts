export const priorityName = {1: 'very low', 2: 'low', 3: 'medium', 4: 'high', 5: 'very high'};

export class Node {
    constructor(public value: number, public priority: number){
    }

    postPriority(): void {
        console.log(`Node: ${this.value}, Priority: ${priorityName[this.priority]}`);
    }
}
