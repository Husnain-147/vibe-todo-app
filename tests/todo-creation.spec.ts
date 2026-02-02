import { test, expect } from '@playwright/test';

test.describe('Todo Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the tasks page
    await page.goto('http://localhost:3000/tasks');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should create a new todo task successfully', async ({ page }) => {
    // Step 1: Click the "New Task" button
    const newTaskButton = page.getByRole('button', { name: /new task/i });
    await expect(newTaskButton).toBeVisible();
    await newTaskButton.click();

    // Step 2: Wait for the form modal to appear
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Create New Task')).toBeVisible();

    // Step 3: Fill in the task title (required field)
    const titleInput = page.getByLabel(/title/i).or(page.locator('#title'));
    await expect(titleInput).toBeVisible();
    await titleInput.fill('Test Todo Task');

    // Step 4: Fill in the description (optional)
    const descriptionInput = page.getByLabel(/description/i).or(page.locator('#description'));
    await descriptionInput.fill('This is a test task created by Playwright');

    // Step 5: Select a status
    const statusSelect = page.getByLabel(/status/i).or(page.locator('#status'));
    await statusSelect.selectOption('todo');

    // Step 6: Submit the form
    const createButton = page.getByRole('button', { name: /create task/i });
    await createButton.click();

    // Step 7: Verify the form closes
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Step 8: Verify the task appears in the list
    await expect(page.getByText('Test Todo Task')).toBeVisible();
    await expect(page.getByText('This is a test task created by Playwright')).toBeVisible();
  });

  test('should show error when title is empty', async ({ page }) => {
    // Click the "New Task" button
    await page.getByRole('button', { name: /new task/i }).click();

    // Wait for the form to appear
    await expect(page.getByRole('dialog')).toBeVisible();

    // Try to submit without filling the title
    await page.getByRole('button', { name: /create task/i }).click();

    // Verify error message appears
    await expect(page.getByText('Title is required')).toBeVisible();
    
    // Verify the form is still open
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should close form when cancel is clicked', async ({ page }) => {
    // Click the "New Task" button
    await page.getByRole('button', { name: /new task/i }).click();

    // Wait for the form to appear
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click cancel
    await page.getByRole('button', { name: /cancel/i }).click();

    // Verify the form closes
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should close form when clicking outside the modal', async ({ page }) => {
    // Click the "New Task" button
    await page.getByRole('button', { name: /new task/i }).click();

    // Wait for the form to appear
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click outside the modal (on the backdrop)
    const dialog = page.getByRole('dialog');
    await dialog.click({ position: { x: 0, y: 0 } });

    // Verify the form closes
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should create task with different statuses', async ({ page }) => {
    const statuses = ['todo', 'in-progress', 'on-hold', 'completed'];

    for (const status of statuses) {
      // Click the "New Task" button
      await page.getByRole('button', { name: /new task/i }).click();

      // Wait for the form to appear
      await expect(page.getByRole('dialog')).toBeVisible();

      // Fill in the form
      await page.getByLabel(/title/i).or(page.locator('#title')).fill(`Test Task - ${status}`);
      await page.getByLabel(/status/i).or(page.locator('#status')).selectOption(status);

      // Submit
      await page.getByRole('button', { name: /create task/i }).click();

      // Verify form closes
      await expect(page.getByRole('dialog')).not.toBeVisible();

      // Verify task appears
      await expect(page.getByText(`Test Task - ${status}`)).toBeVisible();
    }
  });
});
