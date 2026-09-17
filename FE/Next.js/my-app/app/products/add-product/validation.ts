type ProductInput = {
  name: string;
  comments: string;
};

export function validateProductInput(formData: FormData): ProductInput {
  const name = formData.get("name");
  const comments = formData.get("comments");
  // TODO: add authentication and authorization checks here, e.g. only allow logged-in users to add products
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 80
  ) {
    throw new Error("Product name must be between 2 and 80 characters.");
  }

  if (
    typeof comments !== "string" ||
    comments.trim().length < 1 ||
    comments.trim().length > 500
  ) {
    throw new Error("Comments must be between 1 and 500 characters.");
  }

  return {
    name: name.trim(),
    comments: comments.trim(),
  };
}
