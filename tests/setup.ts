// Test setup file
import { expect, afterEach } from 'vitest';

// Clean up after each test
afterEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
});
