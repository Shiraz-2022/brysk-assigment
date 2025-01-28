import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IContact } from "types/contact";
import { randomColors } from "constants/constant";
import { router } from "expo-router";

interface Props {
  contact: IContact;
  isLastItem: boolean;
}

function ContactItem({ contact, isLastItem }: Props) {
  const { name, email, phone } = contact;

  const getRandomColor = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };

  const handleContactSelect = () => {
    router.push({
      pathname: "/singleContact",
      params: { contact: JSON.stringify(contact) },
    });
  };

  return (
    <View className="bg-secondary-light">
      <TouchableOpacity
        className="flex-row items-center p-4 pt-2"
        onPress={handleContactSelect}
      >
        <View className="flex-row flex-1 items-center">
          <View
            // style={{ backgroundColor: getRandomColor() }}
            className="bg-red-200 rounded-full mr-5 justify-center items-center h-10 w-10"
          >
            <Text className="text-lg font-bold text-white">
              {name.charAt(0).toLocaleUpperCase()}
            </Text>
          </View>
          <View>
            <Text className="text-white font-normal text-lg">{name}</Text>
            <Text className="text-white font-semibold text-xs">
              mobile {phone}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {!isLastItem && (
        <View className="bg-primary-light w-[80%] ml-auto mr-4 h-0.5" />
      )}
    </View>
  );
}

export default memo(ContactItem);
