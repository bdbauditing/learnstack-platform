import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: assign dashboardHeading to the locator for the dashboard heading element
    this.dashboardHeading = page.locator('TODO');
  }

  async goto(): Promise<void> {
    // TODO: navigate to the login page
  }

  async login(email: string, password: string): Promise<void> {
    // TODO: fill the email field
    // TODO: fill the password field
    // TODO: click the submit button
  }
}
