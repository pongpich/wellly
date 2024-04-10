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
import Reward from "../../../assets/images/activity/Reward.png";
import Reward1 from "../../../assets/images/activity/Reward1.png";
import Reward2 from "../../../assets/images/activity/Reward2.png";
import { useNavigation } from "@react-navigation/native";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import SwipeButtonImg from "../../../assets/images/activity/Frame13754.png";
import SwipeButton from "rn-swipe-button";

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

export default function DetailsActivity({ route }) {
  const itemId = route.params.itemId;

  const navigate = useNavigation();
  const [activeColor, setActiveColor] = React.useState("detail");

  React.useEffect(() => {
    if (!!route.params.isRegis) {
      setActiveColor("score");
    }
  }, [route.params]);

  const renderSwipImg = () => {
    return (
      <Image
        source={SwipeButtonImg}
        style={{ width: 72, height: 40, borderRadius: 32 }}
      />
    );
  };

  const styles = StyleSheet.create({
    btnDetail: {
      width: "auto",
      height: 26,
      backgroundColor: activeColor == "detail" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingVertical: 2,
      paddingHorizontal: 8,
      paddingBottom: 4,
      marginRight: 9,
    },
    txtDetail: {
      fontSize: 16,
      color: activeColor == "detail" ? "#FFFFFF" : "#3762FC",
      fontWeight: "700",
      textAlign: "center",
    },
    btnAward: {
      width: "auto",
      height: 27,
      backgroundColor: activeColor == "award" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingVertical: 2,
      paddingHorizontal: 8,
      paddingBottom: 4,
      marginRight: 9,
    },
    txtAward: {
      fontSize: 16,
      color: activeColor == "award" ? "#FFFFFF" : "#3762FC",
      fontWeight: "700",
      textAlign: "center",
    },
    btnScore: {
      width: "auto",
      height: 27,
      backgroundColor: activeColor == "score" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingVertical: 2,
      paddingHorizontal: 8,
      paddingBottom: 4,
      marginRight: 9,
    },
    txtScore: {
      fontSize: 16,
      color: activeColor == "score" ? "#FFFFFF" : "#3762FC",
      fontWeight: "700",
      textAlign: "center",
    },
    btnRegis: {
      width: "100%",
      height: 48,
      backgroundColor: "#3762FC",
      borderRadius: 24,
      paddingVertical: 12,
      marginTop: 20,
      //   alignSelf: "center",
      //   position: "absolute",
      //   bottom: 0,
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
    bottomView: {
      width: "100%",
      position: "absolute",
      bottom: 40,
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
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
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

            <Text>1 ม.ค. - 30 ม.ค. 2566</Text>
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
          {route.params.isRegis && (
            <TouchableOpacity
              style={styles.btnScore}
              onPress={() => setActiveColor("score")}
            >
              <Text style={styles.txtScore}>คะแนน</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btnDetail}
            onPress={() => setActiveColor("detail")}
          >
            <Text style={styles.txtDetail}>รายละเอียด</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnAward}
            onPress={() => setActiveColor("award")}
          >
            <Text style={styles.txtAward}>รางวัล</Text>
          </TouchableOpacity>
        </View>

        {activeColor == "detail" ? (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "300" }}>
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

            <View>
              <TouchableOpacity
                style={styles.btnRegis}
                onPress={() =>
                  navigate.navigate("AllActivities", {
                    isRegis: true,
                  })
                }
              >
                <Text style={styles.txtDetail}>ลงทะเบียน</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {activeColor == "award"
          ? data.map((item) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 24,
                }}
              >
                <View>
                  <Image
                    source={item.img}
                    style={{ width: 80, height: 80, marginRight: 16 }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    display: "flex",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#2A323C",
                        fontWeight: "700",
                        fontSize: 16,
                      }}
                    >
                      {item.title1}
                    </Text>
                    <Text
                      style={{
                        color: "#93A8C1",
                        fontWeight: "400",
                        fontSize: 12,
                      }}
                    >
                      {item.title2}
                    </Text>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text
                      style={{
                        color: "#697D96",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          : null}

        {activeColor == "score" ? (
          <View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  คะแนนของฉัน
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigate.navigate("TableScoreOfActivity", {
                      itemId: 86,
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      color: "#3762FC",
                    }}
                  >
                    ตารางคะแนน
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 14,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          height: 16,
                          width: 16,
                          zIndex: 1,
                          marginRight: 8,
                        }}
                        source={Foot_step}
                      />
                      <Text
                        style={{
                          color: "#3762FC",
                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        4000
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#93ABC1",
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      400,000 ก้าว
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        width: 65,
                        maxWidth: "100%",
                        height: 16,
                        borderRadius: 16,
                        backgroundColor:
                          // #93ABC1
                          "#3762FC",
                      }}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 14,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          height: 16,
                          width: 16,
                          zIndex: 1,
                          marginRight: 8,
                        }}
                        source={Distance}
                      />
                      <Text
                        style={{
                          color: "#3762FC",

                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        400
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#93ABC1",
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      1,000 กิโลเมตร
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        width: 65,
                        maxWidth: "100%",
                        height: 16,
                        borderRadius: 16,
                        backgroundColor:
                          // #93ABC1
                          "#3762FC",
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>

      {activeColor == "score" && (
        <View style={styles.bottomView}>
          <SwipeButton
            containerStyles={{ borderRadius: 32 }}
            width={"auto"}
            height={56}
            onSwipeSuccess={() => navigate.navigate("StartTimerActivity")}
            shouldResetAfterSuccess={true}
            railBackgroundColor="#E5EEF9"
            railStyles={{
              borderRadius: 32,
              backgroundColor: "#59CBE4",
              borderColor: "white",
            }}
            railBorderColor="#FFFFFF"
            title="เริ่มออกกำลังกาย"
            titleColor="#697D96"
            titleStyles={{ fontWeight: "700", fontSize: 16 }}
            thumbIconBorderColor="#59CBE4"
            thumbIconWidth={72}
            thumbIconBackgroundColor="#59CBE4"
            thumbIconComponent={renderSwipImg}
          />
        </View>
      )}
    </ScrollView>
  );
}
