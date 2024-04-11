import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as React from "react";
import banner from "../../../assets/images/activity/Ads.png";
import Closebutton from "../../../assets/images/activity/Closebutton.png";
import Reward from "../../../assets/images/activity/RewardBig1.png";
import Reward1 from "../../../assets/images/activity/Reward1.png";
import Reward2 from "../../../assets/images/activity/Reward2.png";
import { useNavigation } from "@react-navigation/native";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import AvartarImg from "../../../assets/images/activity/Group13719.png";

const data = [
  {
    id: 1,
    title1: "รางวัลที่ 1",
    title2: "1 รางวัล",
    subtitle: "เครื่องอบขนมปังลายทหารอากาศจากอิตาลี",
    img: Reward,
  },
  {
    id: 2,
    title1: "รางวัลที่ 2",
    title2: "5 รางวัล",
    subtitle: "เครื่องเขียนถ่านไฟฉายตากบอ๋บๆ",
    img: Reward1,
  },
  {
    id: 3,
    title1: "รางวัลที่ 3",
    title2: "300 รางวัล",
    subtitle: "เงินจำนวน 10 บาท",
    img: Reward2,
  },
];

export default function DetailsActivityDone({ route }) {
  const itemId = route.params.itemId;

  const navigate = useNavigation();
  const [activeColor, setActiveColor] = React.useState("award");

  const styles = StyleSheet.create({
    btnDetail: {
      width: "auto",
      height: 26,
      backgroundColor: activeColor == "detail" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingHorizontal: 8,
      marginRight: 9,
    },
    txtDetail: {
      fontSize: 16,
      color: activeColor == "detail" ? "#FFFFFF" : "#3762FC",
      fontFamily: "IBMPlexSansThai-Bold",
      textAlign: "center",
    },
    btnAward: {
      width: "auto",
      height: 27,
      backgroundColor: activeColor == "award" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingHorizontal: 8,
      marginRight: 9,
    },
    txtAward: {
      fontSize: 16,
      color: activeColor == "award" ? "#FFFFFF" : "#3762FC",
      fontFamily: "IBMPlexSansThai-Bold",
      textAlign: "center",
    },

    progressBar: {
      marginTop: 7,
      width: "100%",
      height: 16,
      backgroundColor: "#E5EEF9",
      borderRadius: 16,
      zIndex: 0,
    },

    containerMain: {
      flexGrow: 1,
      backgroundColor: "white",
      flexDirection: "column",
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      <ImageBackground
        source={banner}
        style={{
          height: 211,
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Image
            source={Closebutton}
            style={{ width: 32, height: 32, marginTop: 60, marginLeft: 16 }}
          />
        </TouchableOpacity>
      </ImageBackground>

      <View style={{ padding: 17 }}>
        <Text style={{ fontSize: 20, fontFamily: "IBMPlexSansThai-Bold" }}>
          วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ขององค์กร ABCDF group
        </Text>
        <View
          style={{
            marginTop: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 16,
                width: 16,
                zIndex: 1,
                marginRight: 8,
              }}
              source={dateIcon}
            />

            <Text
              style={{ fontSize: 14, fontFamily: "IBMPlexSansThai-Regular" }}
            >
              1 ม.ค. - 30 ม.ค. 2566
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 24,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            style={styles.btnAward}
            onPress={() => setActiveColor("award")}
          >
            <Text style={styles.txtAward}>ประกาศรางวัล</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDetail}
            onPress={() => setActiveColor("detail")}
          >
            <Text style={styles.txtDetail}>รายละเอียด</Text>
          </TouchableOpacity>
        </View>

        {activeColor == "award" && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "IBMPlexSansThai-Bold" }}>
              ผู้ที่ได้รับรางวัล
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigate.navigate("TableRankDone", {
                  itemId: 86,
                })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "IBMPlexSansThai-Medium",
                  color: "#3762FC",
                }}
              >
                ตารางคะแนน
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeColor == "detail" ? (
          <View>
            <Text
              style={{ fontSize: 16, fontFamily: "IBMPlexSansThai-Regular" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown containing Lorem Ipsum passages, and
              more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown
            </Text>
          </View>
        ) : null}

        {activeColor == "award"
          ? data.map((item) => (
              <View
                style={{
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#2A323C",
                      fontFamily: "IBMPlexSansThai-Bold",
                      fontSize: 16,
                    }}
                  >
                    {item.title1}
                  </Text>
                  <Text
                    style={{
                      color: "#93A8C1",
                      fontFamily: "IBMPlexSansThai-Medium",
                      fontSize: 14,
                    }}
                  >
                    {item.title2}
                  </Text>
                </View>

                <View style={{ marginTop: 8, marginBottom: 8 }}>
                  <Text
                    style={{
                      color: "#697D96",
                      fontFamily: "IBMPlexSansThai-Regular",
                      fontSize: 16,
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <View>
                  <Image
                    source={item.img}
                    style={{ width: "100%", height: 343, marginRight: 16 }}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Image
                    source={AvartarImg}
                    style={{ width: 32, height: 32, marginRight: 6 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "IBMPlexSansThai-Medium",
                    }}
                  >
                    Sorawit Kri.
                  </Text>
                </View>
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
}
