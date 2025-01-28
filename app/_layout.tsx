import { Stack } from "expo-router";
import ErrorBoundary from "react-native-error-boundary";
import { errorHandler } from "utils/errorHandler";
import AppProviders from "context/AppProvider";
import ErrorFallbackComponent from "components/global/ErrorFallbackComponent";
import "global.css";

export default function RootLayout() {
  return (
    <ErrorBoundary onError={errorHandler}>
      <AppProviders>
        <ErrorFallbackComponent />
        <Stack screenOptions={{ headerShown: false }} />
      </AppProviders>
    </ErrorBoundary>
  );
}
