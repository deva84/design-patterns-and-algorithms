import {Comparable} from './Comparable';

export let counter = 0;

export function incrementCounter(): number {
    return counter++;
}

export function getComparisonByField(item1: Item, item2: Item, field: keyof Item): number {
    if (<number>item1[field] > <number>item2[field]) {
        return 1;
    }
    if (<number>item1[field] < <number>item2[field]) {
        return -1;
    }
    return (item1.name as string).localeCompare((item2.name as string), undefined, {sensitivity: 'base'});
}

export abstract class Item implements Comparable<Item> {
    public readonly id: number;
    public value: number;
    public weight: number;
    public name: string | undefined;
    static get numberOfItems(): number {
        return counter;
    }

    protected constructor(value: number, weight: number, name?: string) {
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.id = this.setId();
    }

    abstract use(): void

    public compareTo(other: Item): number {
        return getComparisonByField(this, other, 'value');
    }

    public toString(): string {
      return `${this.name} − Value: ${this.value}, Weight: ${this.weight}`;
    }

    public getId(): number {
        return this.id;
    }

    public getValue(): number {
        return this.value;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setValue(price: number): void {
        this.value = price;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public setId(): number {
        return incrementCounter();
    }

    static reset(): void {
        counter = 0;
    }
}
