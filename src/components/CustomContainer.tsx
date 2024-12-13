import { FlatList } from "react-native";
import React from "react";

const CustomContainer = ({ children }: any) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={[{ key: "1" }]}
      renderItem={() => <>{children}</>}
    />
  );
};

export default CustomContainer;
