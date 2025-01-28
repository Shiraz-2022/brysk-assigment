import React, { useState, useCallback } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { getContacts } from "utils/asyncStorage";
import { IContact } from "types/contact";
import { groupAndSortContacts, filterContacts } from "utils/contactUtils";
import SearchBar from "components/SearchBar";
import useSearchBarAnimation from "hooks/useSearchBarAnimation";
import ContactSectionList from "components/ContactSectionList";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

export default function ContactList() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [search, setSearch] = useState("");

  const {
    isSearchActive,
    toggleSearchBar,
    slideAnim,
    opacityAnim,
    contactListAnim,
  } = useSearchBarAnimation();

  useFocusEffect(
    useCallback(() => {
      const fetchContacts = async () => {
        const storedContacts = await getContacts();
        setContacts(storedContacts);
      };
      fetchContacts();
    }, [])
  );

  const sections = groupAndSortContacts(contacts);
  const filteredSections = filterContacts(sections, search);

  const handleAddContact = () => {
    router.push("/AddContact");
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-primary-default h-full">
      <View className="flex-row items-center justify-between mb-5">
        <Text className="text-white text-xl font-bold">Contacts</Text>
        <View className="flex flex-row">
          {/* Add Contact Button */}
          <Pressable onPress={handleAddContact} className="mr-5">
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

      {/* Search Bar */}
      <SearchBar
        isSearchActive={isSearchActive}
        setSearch={setSearch}
        slideAnim={slideAnim}
        opacityAnim={opacityAnim}
        contactListAnim={contactListAnim}
      />

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
