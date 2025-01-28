import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IContact } from "types/contact";
import DeleteModal from "components/modals/DeleteModal";

export default function singleContact() {
  const params = useLocalSearchParams();
  const { contact } = params;
  const parsedContact: IContact = JSON.parse(contact as string);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleEditContact = () => {
    router.push({ pathname: "/AddContact", params: { contact } });
  };

  const handleDeleteContact = () => {
    setDeleteModal(true);
  };

  return (
    <SafeAreaView className="p-4 h-full bg-primary-default">
      <Ionicons
        name="chevron-back"
        size={32}
        color="white"
        onPress={() => router.back()}
      />
      <View className="bg-secondary-light rounded-lg justify-center items-center mt-20 mb-10 p-4 relative">
        <View className="rounded-full h-24 w-24 bg-red-200 absolute left-1/2 -top-12 -translate-x-6 justify-center items-center">
          <Text className="text-white text-2xl">
            {parsedContact.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-white font-bold text-2xl mb-2 mt-12">
          {parsedContact.name}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-white font-thin text-sm mr-2">Mobile</Text>
          <Text className="text-white text-lg font-normal">
            {parsedContact.phone}
          </Text>
        </View>
      </View>

      <View className="bg-secondary-light rounded-lg p-4">
        <View>
          <Text className="text-white font-normal text-lg mb-5">Email</Text>
          <Text className="text-white mb-5">{parsedContact.email}</Text>
        </View>
        <View>
          <Text className="text-white font-normal text-lg mb-5">Address</Text>
          <Text className="text-white ">{parsedContact.address}</Text>
        </View>
      </View>
      <View className="flex-row mx-auto mt-auto">
        <TouchableOpacity onPress={handleEditContact}>
          <Feather
            name="edit"
            size={24}
            color="white"
            style={{ marginRight: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteContact}>
          <MaterialIcons name="delete-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <DeleteModal
        visible={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={() => {}}
      />
    </SafeAreaView>
  );
}
