export const errorHandler = (error: Error | string, stackTrace?: string) => {
  console.error("Error:", error);
  stackTrace && console.error("Stack trace:", stackTrace);
};
