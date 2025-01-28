// components/SearchBar.tsx
import React, { useState, useEffect } from "react";
import { TextInput, Animated } from "react-native";

interface Props {
  isSearchActive: boolean;
  setSearch: (text: string) => void;
  slideAnim: Animated.Value;
  opacityAnim: Animated.Value;
  contactListAnim: Animated.Value;
}

const SearchBar = ({
  isSearchActive,
  setSearch,
  slideAnim,
  opacityAnim,
  contactListAnim,
}: Props) => {
  const [search, setSearchState] = useState("");

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: opacityAnim,
      }}
    >
      {isSearchActive && (
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearchState}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
          }}
        />
      )}
    </Animated.View>
  );
};

export default SearchBar;
