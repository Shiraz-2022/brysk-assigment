import React from "react";
import { SectionList, Text, View } from "react-native";
import ContactItem from "./ContactItem";
import { ISection } from "types/contact";

type Props = {
  sections: ISection[];
};

export default function ContactSectionList({ sections }: Props) {
  const renderContactItem = ({ item, index, section }: any) => (
    <View>
      <ContactItem
        contact={item}
        isLastItem={index === section.data.length - 1}
      />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View className="p-2 rounded-lg flex-row">
      <Text className="text-gray-700 dark:text-gray-300 font-semibold">
        {title}
      </Text>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => `${item.id}`}
      showsVerticalScrollIndicator={false}
      renderItem={renderContactItem}
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={{ paddingBottom: 200 }}
    />
  );
}
