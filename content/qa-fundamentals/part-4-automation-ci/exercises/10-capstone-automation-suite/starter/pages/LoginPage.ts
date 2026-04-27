import { type Page, type Locator } from '@playwright/test';

/**
 * LoginPage — Page Object for the TaskForge login screen.
 *
 * Copy your implementation from Exercise 02, or build it fresh here.
 * The test files import this class — if it stays as a stub, all tests will fail.
 */
export class LoginPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: point dashboardHeading at the correct locator
    this.dashboardHeading = page.locator('TODO');
  }

  async goto(): Promise<void> {
    // TODO: navigate to /login
  }

  async login(email: string, password: string): Promise<void> {
    // TODO: fill email, fill password, click submit
  }
}
