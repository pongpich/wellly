import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import caret from "../../assets/images/icon/caret.png";
import history_img from "../../assets/images/activity/History.png";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AllAct from "./all_act";
import AlreadyRegistered from "./already_registered";

const renderScene = SceneMap({
  first: AllAct,
  second: AlreadyRegistered,
});

export default function AllActivities() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "ทั้งหมด" },
    { key: "second", title: "ลงทะเบียนแล้ว" },
  ]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 24 }}>กิจกรรม</Text>
          <TouchableOpacity onPress={() => {}}>
            <Image style={{ width: 24, height: 24 }} source={history_img} />
          </TouchableOpacity>
        </View>
        <View style={{ height: "100%" }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: "#3762FC",
                  borderBottomWidth: 1,
                }}
                contentContainerStyle={{
                  borderBottomColor: "#C2D2E7",
                  borderBottomWidth: 1,
                }}
                renderLabel={({ route, color }) => (
                  <Text
                    style={{
                      color: route.key == "first" ? "#3762FC" : "#93A8C1",
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    {route.title}
                  </Text>
                )}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
