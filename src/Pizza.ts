import {Consumable} from "./Consumable";

export class Pizza extends Consumable {
    public defaultName = 'pizza';
    public numberOfSlices: number;
    public slicesEaten: number;
    public defaultValue = 100;
    public defaultWeight = 50;

    constructor(numberOfSlices: number, spoiled: boolean, value?: number, weight?: number) {
        // @ts-ignore
        super(value, weight, spoiled);
        this.name = this.defaultName;
        this.numberOfSlices = numberOfSlices;
        this.value = value || this.defaultValue;
        this.weight = weight || this.defaultWeight;
        this.slicesEaten = 0
    }

    public eat(): string {
        if (this.slicesEaten < this.numberOfSlices) {
            this.slicesEaten++;
            if (this.slicesEaten >= this.numberOfSlices) {
                this.setConsumed(true);
            }
            return 'You eat a slice of pizza';
        } else {
            return '';
        }
    }
}
