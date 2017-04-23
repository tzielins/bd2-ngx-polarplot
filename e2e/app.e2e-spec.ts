import { Bd2NgxPolarplotPage } from './app.po';

describe('bd2-ngx-polarplot App', () => {
  let page: Bd2NgxPolarplotPage;

  beforeEach(() => {
    page = new Bd2NgxPolarplotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
