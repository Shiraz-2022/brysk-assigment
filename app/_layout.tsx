import { Stack } from "expo-router";
import ErrorBoundary from "react-native-error-boundary";
import { errorHandler } from "utils/errorHandler";
import AppProviders from "context/AppProvider";
import ErrorFallbackComponent from "components/global/ErrorFallbackComponent";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import "global.css";

export default function RootLayout() {
  //handle native and js exceptions and send them to the error handler.

  // setJSExceptionHandler((error, isFatal) => {
  //   errorHandler(error);
  // }, true);

  // setNativeExceptionHandler((exceptionString) => {
  //   errorHandler(exceptionString);
  // }, false);

  return (
    <ErrorBoundary
      onError={errorHandler}
      FallbackComponent={ErrorFallbackComponent}
    >
      <AppProviders>
        <ErrorFallbackComponent />
        <Stack screenOptions={{ headerShown: false }} />
      </AppProviders>
    </ErrorBoundary>
  );
}
