import {getComparisonByField, Item} from './Item';
import { ItemComparator } from './ItemComparator';

export class ItemWeightComparator implements ItemComparator {
    public compare(first: Item, second: Item) {
        return getComparisonByField(first, second, 'weight');
    }
}
