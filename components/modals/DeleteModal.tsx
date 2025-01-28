import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

interface IDeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  visible,
  onClose,
  onDelete,
}: IDeleteModalProps) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View className="flex-1 justify-end items-center bg-black/50 px-5">
        <View className="w-full bg-primary-light p-6 rounded-t-xl items-center m-3 rounded-lg">
          <Text className="text-sm mb-7 text-white">
            Are you sure you want to delete?
          </Text>
          <View className="flex-row w-full justify-evenly">
            <TouchableOpacity className="px-4 py-2" onPress={onClose}>
              <Text className="text-white font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2" onPress={onDelete}>
              <Text className="text-white font-bold">Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
