import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the context type
// interface APIKeyContextType {
//   APIKey: string;
//   saveAPIKey: (key: string) => Promise<void>;
// }

// Create the context with a default value
export const APIKeyContext = createContext();

export const APIKeyProvider = ({ children }) => {
  const [APIKey, setAPIKey] = useState("");

  useEffect(() => {
    const loadAPIKey = async () => {
      try {
        const storedKey = await AsyncStorage.getItem("APIKey");
        if (storedKey) {
          setAPIKey(storedKey);
        }
      } catch (error) {
        console.error("Error loading API Key from AsyncStorage:", error);
      }
    };
    loadAPIKey();
  }, []);

  const saveAPIKey = async (key) => {
    try {
      await AsyncStorage.setItem("APIKey", key);
      setAPIKey(key);
    } catch (error) {
      console.error("Error saving API Key to AsyncStorage:", error);
    }
  };

  return (
    <APIKeyContext.Provider value={{ APIKey, saveAPIKey }}>
      {children}
    </APIKeyContext.Provider>
  );
};
