import { GroceriesWebappPage } from './app.po';

describe('groceries-webapp App', function() {
  let page: GroceriesWebappPage;

  beforeEach(() => {
    page = new GroceriesWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
