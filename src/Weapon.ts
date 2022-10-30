import {Item} from "./Item";

export abstract class Weapon extends Item {
    public MODIFIER_CHANGE_RATE: number = 0.05;
    public baseDamage: number;
    public damageModifier = this.MODIFIER_CHANGE_RATE;
    public baseDurability: number;
    public durabilityModifier = this.MODIFIER_CHANGE_RATE;
    public effectiveDamage: number;
    public effectiveDurability: number;

    protected constructor(baseDamage: number, baseDurability: number, value: number, weight: number, name?: string) {
        super(value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
        this.effectiveDamage = this.baseDamage + this.damageModifier;
        this.effectiveDurability = this.baseDurability + this.durabilityModifier;
        this.name = name;
    }

    abstract polish(): void;

    public use(): string {
        if (this.getDurability() > 0) {
            this.effectiveDurability -= this.MODIFIER_CHANGE_RATE;
            let baseMessage = `You use the ${this.name}, dealing ${this.getDamage()} points of damage.`
            if (this.getDurability() <= 0) {
                baseMessage += `\nThe ${this.name} breaks.`
            }
            return baseMessage;
        }
        return `You can't use the ${this.name}, it is broken`
    }

    public getDamage(): number {
        return this.effectiveDamage;
    }

    public getDurability(): number {
        return this.effectiveDurability;
    }

    public toString(): string {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight}, Damage: ${this.getDamage().toFixed(2)}, 
        Durability:${(this.getDurability() * 100).toFixed(2)}%`;
    }
}
