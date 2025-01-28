import { TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IContactInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "phone-pad"
    | "numeric"
    | "decimal-pad";
  multiline?: boolean;
  iconName?: string;
}

export default function ContactInput({
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  multiline = false,
  iconName,
}: IContactInputProps) {
  return (
    <View className="flex-row items-center bg-primary-light p-4 mb-4 rounded-full">
      {iconName && (
        <Ionicons
          name={iconName}
          size={20}
          color="#666"
          style={{ marginRight: 8 }}
        />
      )}
      <TextInput
        className="flex-1 text-white"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}
