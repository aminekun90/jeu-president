import { Card } from "@daifuqo/app/model/Card";


describe('Card', () => {
  it('should create an instance', () => {
    expect(new Card("","")).toBeTruthy();
  });
});
