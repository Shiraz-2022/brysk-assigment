export const errorHandler = (error: Error | string, stackTrace?: string) => {
  if (typeof error === "string") {
    console.error("Error:", error);
  } else {
    console.error("Error:", error.message);
    console.error("Name:", error.name);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
  }

  if (stackTrace) {
    console.error("Custom stack trace:", stackTrace);
  }
};
