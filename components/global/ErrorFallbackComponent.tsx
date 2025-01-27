import React from "react";
import { Modal, Text, Button, View } from "react-native";
import { useErrorHandler } from "context/ErrorHandlerContext";

const ErrorFallbackComponent = () => {
  const { error, clearError } = useErrorHandler();

  if (!error) return null;

  return (
    <Modal transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Error</Text>
          <Text style={{ marginVertical: 10 }}>
            {error.message || "Something went wrong!"}
          </Text>
          <Button title="Try Again" onPress={clearError} />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorFallbackComponent;
