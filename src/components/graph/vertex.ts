export class Vertex {
    private readonly key: string;

   constructor(key: string) {
        this.key = key;
    }

    getKey(): string {
        return this.key;
    }
}
