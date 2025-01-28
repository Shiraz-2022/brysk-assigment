import { TextInput } from "react-native";
import React from "react";

interface ISearchBarProps {
  search: string;
  handleSearchChange: (text: string) => void;
}

export default function SearchBar({
  search,
  handleSearchChange,
}: ISearchBarProps) {
  return (
    <TextInput
      className="bg-primary-light px-2 py-3 rounded-lg text-white font-normal"
      placeholder="Search"
      placeholderTextColor="#888"
      value={search}
      onChangeText={(text) => handleSearchChange(text)}
    />
  );
}
