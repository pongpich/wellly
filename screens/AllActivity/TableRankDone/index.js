import { View, Text, ScrollView, Image } from "react-native";
import * as React from "react";
import { DataTable } from "react-native-paper";
import AvartarImg from "../../../assets/images/activity/Group13719.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import Medallions from "../../../assets/images/activity/Medallions.png";
import RankGoldImg from "../../../assets/images/activity/Group481452.png";
import RankBronzeImg from "../../../assets/images/activity/Bronze.png";
import { LinearGradient } from "expo-linear-gradient";

export default function TableRankDone({ route }) {
  const itemId = route.params.itemId;

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 25,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <View style={{ flex: 1, marginTop: 60, alignItems: "center" }}>
          <Image source={Medallions} style={{ width: 56, height: 56 }} />
          <Text
            style={{
              fontFamily: "IBMPlexSansThai-Bold",
              fontSize: 16,
              marginTop: -15,
            }}
          >
            Anna Baz.
          </Text>
          <LinearGradient
            style={{
              width: 88,
              height: 117,
              padding: 7,
              marginTop: 18,
            }}
            colors={["#93A8C1CC", "#C2D2E700"]}
          >
            <Text
              style={{
                fontFamily: "IBMPlexSansThai-Bold",
                fontSize: 24,
                color: "white",
                textAlign: "center",
              }}
            >
              2
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Foot_step}
                style={{ width: 16, height: 16, marginRight: 2 }}
              />
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 14,
                }}
              >
                320,023
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Distance}
                style={{ width: 16, height: 16, marginRight: 2 }}
              />
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 14,
                }}
              >
                980
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image source={RankGoldImg} style={{ width: 72, height: 72 }} />
          <Text
            style={{
              fontFamily: "IBMPlexSansThai-Bold",
              fontSize: 16,
            }}
          >
            Borpitbull
          </Text>
          <LinearGradient
            style={{
              width: 88,
              height: 150,
              padding: 7,
              marginTop: 18,
            }}
            colors={["#D89E08CC", "#D89E0800"]}
          >
            <Text
              style={{
                fontFamily: "IBMPlexSansThai-Bold",
                fontSize: 24,
                color: "white",
                textAlign: "center",
              }}
            >
              1
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Foot_step}
                style={{ width: 16, height: 16, marginRight: 2 }}
              />
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 14,
                }}
              >
                320,023
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Distance}
                style={{ width: 16, height: 16, marginRight: 2 }}
              />
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 14,
                }}
              >
                980
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={{ flex: 1, marginTop: 60, alignItems: "center" }}>
          <Image source={RankBronzeImg} style={{ width: 56, height: 56 }} />
          <Text
            style={{
              fontFamily: "IBMPlexSansThai-Bold",
              fontSize: 16,
              marginTop: -15,
            }}
          >
            Veddi Kia.
          </Text>
          <LinearGradient
            style={{
              width: 88,
              height: 117,
              padding: 7,
              marginTop: 18,
            }}
            colors={["#DE9F83CC", "#EAD0B900"]}
          >
            <Text
              style={{
                fontFamily: "IBMPlexSansThai-Bold",
                fontSize: 24,
                color: "white",
                textAlign: "center",
              }}
            >
              3
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Foot_step}
                style={{ width: 16, height: 16, marginRight: 2 }}
              />
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 14,
                }}
              >
                320,023
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Distance}
                style={{ width: 16, height: 16, marginRight: 2 }}
              />
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 14,
                }}
              >
                980
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: "100%",
          backgroundColor: "white",
          marginTop: 2,
        }}
      >
        <DataTable>
          <DataTable.Header style={{ borderBottomWidth: 0 }}>
            <DataTable.Title />

            <DataTable.Title>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Medium", fontSize: 14 }}
              >
                ชื่อ
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Medium", fontSize: 14 }}
              >
                ก้าวเดิน
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Medium", fontSize: 14 }}
              >
                ระยะทาง
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Regular", fontSize: 14 }}
              >
                1
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={AvartarImg}
                  style={{ width: 32, height: 32, marginRight: 6 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Bold",
                    fontSize: 16,
                  }}
                >
                  Sorawit Kri.
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1.5 }}>
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 16,
                }}
              >
                320,023
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 16,
                }}
              >
                980
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>
    </View>
  );
}
