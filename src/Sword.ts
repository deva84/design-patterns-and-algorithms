import {Weapon} from "./Weapon";

export class Sword extends Weapon {
    public defaultName = 'sword';

   constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
       super(baseDamage, baseDurability, value, weight);
       this.name = this.defaultName;
    }

    polish(): void {
        const currentDamageModifier = this.damageModifier + this.MODIFIER_CHANGE_RATE;
        const maxDamageModifier = this.baseDamage * 0.25;
        if (currentDamageModifier > maxDamageModifier) {
            this.damageModifier = maxDamageModifier;
        } else {
            this.damageModifier = currentDamageModifier;
        }
    }
}
