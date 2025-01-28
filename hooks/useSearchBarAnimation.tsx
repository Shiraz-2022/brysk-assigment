// hooks/useSearchBarAnimation.ts
import { useState, useRef } from "react";
import { Animated, Easing } from "react-native";

const useSearchBarAnimation = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const contactListAnim = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contactListAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setIsSearchActive(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contactListAnim, {
          toValue: 10,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return {
    isSearchActive,
    toggleSearchBar,
    slideAnim,
    opacityAnim,
    contactListAnim,
  };
};

export default useSearchBarAnimation;
