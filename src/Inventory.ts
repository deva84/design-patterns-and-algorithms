import {Item} from "./Item";
import {ItemComparator} from "./ItemComparator";

export class Inventory {
    private items: Item[] = [];

    public addItem(item: Item): void {
        const itemsCopy = [...this.items];
        this.items = [...itemsCopy, item];
    }

    public sort(): void;
    public sort(comparator: ItemComparator): void;

    public sort(comparator?: ItemComparator): void {
        if (comparator) {
            this.items.sort((a, b) => comparator.compare(a, b));
        }
        this.items.sort((a, b) => a.compareTo(b))
    }

    public toString(): string {
        return this.items.map(item => {
            const itemCopy = {...item};
            return itemCopy.toString();
        }).join(', ');
    }

    public getItems(): Item[] {
        return this.items;
    }
}

