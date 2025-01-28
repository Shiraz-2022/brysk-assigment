import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import ContactSectionList from "components/ContactSectionList";
import { IContact } from "types/contact";
import { groupAndSortContacts, filterContacts } from "utils/contactUtils";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getContacts } from "utils/asyncStorage"; // Assuming you have a utility function to get contacts
import { useFocusEffect } from "@react-navigation/native"; // Importing the hook

export default function ContactList() {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<IContact[]>([]); // Contact state
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Fetch contacts when the component mounts or comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchContacts = async () => {
        const storedContacts = await getContacts(); // Get contacts from storage or API
        setContacts(storedContacts); // Set contacts state
      };
      fetchContacts();
    }, []) // Empty dependency array ensures it runs every time the screen is focused
  );

  const sections = groupAndSortContacts(contacts); // Group and sort contacts by the first letter of the name
  const filteredSections = filterContacts(sections, search);

  const slideAnim = useRef(new Animated.Value(-50)).current; // Initial slide value
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity
  const contactListAnim = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    if (isSearchActive) {
      // Hide the search bar
      setIsSearchActive(false);
      setSearch("");

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -50, // Slide out
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0, // Fade out
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contactListAnim, {
          toValue: 0, // Move contact list back up
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => setIsSearchActive(false)); // Set state after animation completes
    } else {
      // Show the search bar
      setIsSearchActive(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Slide in
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Fade in
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contactListAnim, {
          toValue: 10, // Move contact list down
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleAddContact = () => {
    router.push("/AddContact");
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-primary-default h-full">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5">
        <Text className="text-white text-xl font-bold">Contacts</Text>
        <View className="flex flex-row">
          <Pressable className="mr-5" onPress={handleAddContact}>
            <Feather name="plus" size={24} color="white" />
          </Pressable>
          <Pressable onPress={toggleSearchBar}>
            {isSearchActive ? (
              <AntDesign name="close" size={24} color="white" />
            ) : (
              <AntDesign name="search1" size={24} color="white" />
            )}
          </Pressable>
        </View>
      </View>

      {/* Animated Search Bar */}
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }}
      >
        {isSearchActive && (
          <View className="mb-5">
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={handleSearchChange}
              style={{
                backgroundColor: "#333",
                color: "#fff",
                padding: 10,
                borderRadius: 8,
              }}
            />
          </View>
        )}
      </Animated.View>

      {/* Contact List */}
      <Animated.View
        style={{
          transform: [{ translateY: contactListAnim }],
        }}
      >
        {filteredSections.length > 0 ? (
          <ContactSectionList sections={filteredSections} />
        ) : (
          <View className="items-center mt-64">
            <Text className="text-white font-semibold">
              No contacts to display
            </Text>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}
