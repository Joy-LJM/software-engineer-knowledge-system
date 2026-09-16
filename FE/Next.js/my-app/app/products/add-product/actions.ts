"use server";

import { validateProductInput } from "./validation.ts";

// server action
export async function addProduct(formData: FormData) {
  const product = validateProductInput(formData);

  // Replace this with a database insert when persistence is added.
  //await db.products.create(product);
  // return {success: true};
  console.log("Product submitted:", product);
}
