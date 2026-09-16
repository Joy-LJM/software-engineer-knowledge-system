import assert from 'node:assert/strict';
import test from 'node:test';
import { addProduct } from './actions.ts';

test('addProduct rejects invalid input sent without the browser form', async () => {
  const invalidData = new FormData();
  invalidData.set('name', '');
  invalidData.set('comments', '');

  await assert.rejects(addProduct(invalidData), {
    message: 'Product name must be between 2 and 80 characters.',
  });
});