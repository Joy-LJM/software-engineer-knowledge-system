"use server";
import { updateTag } from "next/cache";

import { validateProductInput } from "./validation.ts";

// server action
export async function addProduct(
  previousState: { success: boolean } | null,
  formData: FormData,
) {
  const product = validateProductInput(formData);

  // Replace this with a database insert when persistence is added.
  //await db.products.create(product);

  // Next request waits for fresh data (no stale content served)
  updateTag("products");
  console.log("Product submitted:", product);
  return { success: true };
}
