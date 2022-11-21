export class Counter {
    private static counter: Counter;
    private count: number;

    private constructor() {
        this.count = 0;
    }

    static getInstance(): Counter {
        if (!Counter.counter) {
            Counter.counter = new Counter();
        }
        return Counter.counter;
    }

    register(): number {
        return this.count++
    }
}
