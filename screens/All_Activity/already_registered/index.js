import { View, Text } from "react-native";
import React from "react";

export default function AlreadyRegistered() {
  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 20 }}>
      <Text style={{ color: "red" }}>ลงทะเบียนแล้ว</Text>
    </View>
  );
}
