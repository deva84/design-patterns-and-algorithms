import {Weapon} from "./Weapon";

export class Bow extends Weapon {
    public defaultName = 'bow';

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(baseDamage, baseDurability, value, weight);
        this.name = this.defaultName;
    }

    polish(): void {
        const currentDurabilityModifier = this.durabilityModifier + this.MODIFIER_CHANGE_RATE;
        const updatedEffectiveDurability = this.effectiveDurability + currentDurabilityModifier;
        if (updatedEffectiveDurability > 1) {
            this.durabilityModifier = 1 - this.effectiveDurability;
        } else {
            this.durabilityModifier = currentDurabilityModifier;
        }
    }

}
