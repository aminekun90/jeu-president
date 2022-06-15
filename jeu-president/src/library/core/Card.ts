export class Card {
    private name: string;
    private number: number;
    private power: number;
    private category: string;

    constructor(name: string, number: number, category: string, power: number) {
        this.name = name;
        this.number = number;
        this.category = category;
        this.power = power;
    }

    getNumber(): number {
        return this.number;
    }

    getName(): string {
        return this.name;
    }

    getPower(): number {
        return this.power;
    }

    setPower(power: number) {
        this.power = power;
    }

    getCategory(): string {
        return this.category;
    }
    serialize() {
        return {
            name: `${this.name} of ${this.category}`
        }
    }
}
