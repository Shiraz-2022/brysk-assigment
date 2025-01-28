import { Stack } from "expo-router";
import AppProviders from "context/AppProvider";
import ErrorFallbackComponent from "components/global/ErrorFallbackComponent";
import "global.css";

export default function RootLayout() {
  return (
    <AppProviders>
      <ErrorFallbackComponent />
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
