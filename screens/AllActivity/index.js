import { Text, View, TouchableOpacity, Image } from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import history_img from "../../assets/images/activity/History.png";
import AllAct from "./AllAct";
import AlreadyRegistered from "./AlreadyRegistered";

export default function AllActivities({ route }) {
  const navigation = useNavigation();
  const [activeColor, setActiveColor] = React.useState("all");
  let isAlreadyRegisProps = route?.params?.isAlreadyRegis;

  React.useEffect(() => {
    if (isAlreadyRegisProps) {
      setActiveColor("registered");
    }
  }, [route]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          padding: 16,
          paddingTop: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "IBMPlexSansThai-Bold",
          }}
        >
          กิจกรรม
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("DoneActivity")}>
          <Image style={{ width: 24, height: 24 }} source={history_img} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "50%",
              paddingTop: 8,
              paddingBottom: 10,
              borderBottomWidth: 2,
              borderColor: activeColor == "all" ? "#3762FC" : "#93A8C1",
            }}
          >
            <Text
              style={{
                width: 170,
                fontSize: 16,
                fontFamily: "IBMPlexSansThai-Bold",
                textAlign: "center",
                color: activeColor == "all" ? "#3762FC" : "#93A8C1",
              }}
              onPress={() => setActiveColor("all")}
            >
              ทั้งหมด
            </Text>
          </View>

          <View
            style={{
              width: "50%",
              paddingTop: 8,
              paddingBottom: 10,
              borderBottomWidth: 2,
              borderColor: activeColor == "registered" ? "#3762FC" : "#93A8C1",
            }}
          >
            <Text
              style={{
                width: 170,
                fontSize: 16,
                fontFamily: "IBMPlexSansThai-Bold",
                textAlign: "center",
                color: activeColor == "registered" ? "#3762FC" : "#93A8C1",
              }}
              onPress={() => setActiveColor("registered")}
            >
              ลงทะเบียนแล้ว
            </Text>
          </View>
        </View>
      </View>

      {activeColor == "all" ? <AllAct /> : null}
      {activeColor == "registered" ? <AlreadyRegistered /> : null}
    </View>
  );
}
