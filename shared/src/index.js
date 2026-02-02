export function buildHelloMessage(name = "world") {
  const safeName =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : "world";

  return `Hello, ${safeName}!`;
}

