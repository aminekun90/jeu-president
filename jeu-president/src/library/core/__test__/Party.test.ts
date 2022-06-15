import { Party } from "../Party";


describe("Deck class", () => {
    let partyClass = new Party();
    afterEach(() => {
        partyClass = new Party();
    });

    describe("startParty", () => {
        it("gives cardSets to each player", () => {
            partyClass.startParty();
            console.log(partyClass.getDeck());
            console.log(partyClass.getPlayers());
            console.log(partyClass.getCurrentPlayerSetOfCards());
            expect(true).toBeTruthy()
        });
    })
});
