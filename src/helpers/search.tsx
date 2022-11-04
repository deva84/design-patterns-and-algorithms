import {Row} from "../components";

export const search = (rows: Row[], searchString: string): Row[] => {
    if (!searchString) return rows;
    const rowsCopy = [...rows];
    return rowsCopy.filter(row => {
        const rowValues = Object.values(row);
        return rowValues.some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase() === searchString.toLowerCase();
            }
            return false;
        })
    })
}
