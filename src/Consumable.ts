import {Item} from "./Item";

export abstract class Consumable extends Item {
    protected consumed: boolean;
    protected spoiled: boolean;


    protected constructor(value: number, weight: number, spoiled: boolean, name?: string) {
        super(value, weight, name);
        this.spoiled = spoiled;
        this.consumed = false;
    }

    public use(): string {
        if (!this.spoiled) {
            if (!this.consumed) {
                return this.eat();
            }
            return `There is nothing left of the ${this.name} to consume.`
        }
        return `You eat the ${this.name}. You feel sick.`
    }

    public eat(): string {
        this.consumed = true;
        return `You eat the ${this.name}.`
    }

    public isConsumed(): boolean {
        return this.consumed;
    }

    public setConsumed(consumed: boolean): void {
        this.consumed = consumed;
    }

    public toString(): string {
        return super.toString();
    }
}
