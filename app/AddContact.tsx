import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import ContactInput from "components/ContactInput";
import { addContact, updateContact } from "utils/asyncStorage";
import { useErrorHandler } from "context/ErrorHandlerContext";

export default function AddContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Fetching the contact data from route params using useLocalSearchParams
  const { contact } = useLocalSearchParams();
  const { setError } = useErrorHandler();

  useEffect(() => {
    if (contact) {
      const parsedContact = JSON.parse(contact as string);
      setName(parsedContact.name || "");
      setPhone(parsedContact.phone || "");
      setEmail(parsedContact.email || "");
      setAddress(parsedContact.address || "");
    }
  }, [contact]);

  const handleSave = async () => {
    // Validate name and phone
    if (!name.trim()) {
      setError(new Error("Validation Error: Name is required."));
      return;
    }
    if (!phone.trim()) {
      setError(new Error("Validation Error: Phone number is required."));
      return;
    }

    const newContact = {
      id: contact ? JSON.parse(contact as string).id : Date.now().toString(), // Use existing ID if updating, else create new one
      name,
      phone,
      email,
      address,
    };

    if (contact) {
      await updateContact(newContact);
      console.log("Contact Updated:", newContact);
      router.replace({
        pathname: "/singleContact",
        params: { contact: JSON.stringify(newContact) },
      });
    } else {
      await addContact(newContact);
      console.log("Contact Saved:", newContact);
      router.back();
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary-default py-4">
      <View className="rounded-lg p-4 mb-4 mt-10">
        <ContactInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
          iconName="person"
        />
        <ContactInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Phone"
          keyboardType="phone-pad"
          iconName="call"
        />
        <ContactInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
          iconName="mail"
        />
        <ContactInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
          multiline
          iconName="location"
        />
      </View>
      <View className="flex-row mx-auto mt-auto">
        <TouchableOpacity className="mr-24" onPress={() => router.back()}>
          <Text className="text-white font-bold text-lg">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-white font-bold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
