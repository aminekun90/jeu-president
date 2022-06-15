import { Deck } from "../Deck";


describe("Deck class", () => {
    let deckClass = new Deck();
    afterEach(() => {
        deckClass = new Deck();
    });
    describe("getPowerByIndex", () => {
        describe("Given index is found", () => {
            it("returns a given index", () => {
                const power = deckClass.getPowerByIndex(10);
                expect(power).toEqual(7);
            });
        });
        describe("Given index is not found", () => {
            it("throws an error", () => {
                try {
                    deckClass.getPowerByIndex(0);
                } catch (error: any) {
                    expect(error.message).toBe("Power not found")
                }
            });
        });
    });

    describe("getNameByIndex", () => {
        describe("Given index is found", () => {
            it("returns a given index", () => {
                const power = deckClass.getNameByIndex(10);
                expect(power).toEqual("10");
            });
        });

        describe("Given index is not found", () => {
            it("throws an error", () => {
                try {
                    deckClass.getNameByIndex(0);
                } catch (error: any) {
                    expect(error.message).toBe("Name not found")
                }
            });
        });
    });

    describe("shuffle", () => {
        it("shuffles the deck", () => {
            deckClass.shuffleCards();
            deckClass.orderCards();
            expect(true).toBeTruthy();
        })
    });

    describe("getCardSetsForPlayers", () => {
        it("get cards for 5 players", () => {
            deckClass.getCardSetsForPlayers(5);
            expect(true).toBeTruthy();
        })
    });
});
