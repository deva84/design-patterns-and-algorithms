export class PriorityQueue {
    collection: (string | number)[][];

    constructor() {
        this.collection = [];
    }

    enqueue(element){
        if (this.isEmpty()){
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++){
                if (element[1] < this.collection[i-1][1]){
                    this.collection.splice(i-1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added){
                this.collection.push(element);
            }
        }
    }

    dequeue(): (string | number)[] {
        return this.collection.shift();
    };

    isEmpty(): boolean {
        return (this.collection.length === 0)
    };
}