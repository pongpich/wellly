import React, { Component } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  ImageBackground,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import colors from "../../constants/colors";
import ComponentsStyle from "../../constants/components";
import Modal from "react-native-modal";
import { withTranslation } from "react-i18next";
import { calculateWeekInProgram, currentTime } from "../../helpers/utils";
import { connect } from "react-redux";
import { getActivityList, getExerciserActivity } from "../../redux/get";
import {
  updateNumberCompleted,
  resetStatusUpdateNumbComp,
} from "../../redux/update";
import { CommonActions } from "@react-navigation/native";
import { t } from "i18next";
class ExAddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stsusColor: "เข้มข้นต่ำ",
      isModalVisible2: false,
      isModalConter2: false,
      study: "ทั้งหมด",
      activity: "",
      intensity: "",
      type: "default",
      duration: "",
      note: "",
      statusLoading: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // รับ   params จาก  route
      const { activity, intensity, type } = this.props.route.params;
      this.setState({
        activity: activity,
        intensity: intensity,
        type: type,
      });

      this.props.resetStatusUpdateNumbComp();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { statusUpdateNumbComp, user } = this.props;
    const { isModalConter2 } = this.state;

    if (
      prevProps.statusUpdateNumbComp !== statusUpdateNumbComp &&
      statusUpdateNumbComp === "success"
    ) {
      this.setState({ statusLoading: false });
      this.props.getExerciserActivity(user && user.user_id);

      this.props.navigation.navigate("ExAdd", { message: "บันทึกกิจกรรมแล้ว" });
    }
    if (prevState.isModalConter2 !== isModalConter2 && isModalConter2 == true) {
      this.props.navigation.goBack();
    }
  }

  toggleModal(isModalVisible2) {
    this.setState({
      isModalVisible2: !isModalVisible2,
    });
  }
  isModalConter(isModalConter2) {
    this.setState({
      isModalConter2: !isModalConter2,
    });
  }
  deleteActivity2(isModalConter2) {
    this.setState({
      note: "",
      duration: "",
      isModalVisible2: false,
      isModalConter2: !isModalConter2,
    });
    /*         this.props.navigation.goBack(); */
  }

  saveMission() {
    const { duration, note } = this.state;
    const { user, statusUpdateNumbComp } = this.props;
    this.setState({
      statusLoading: true,
    });

    // ใช้ params จาก  route ในหน้า Add.js
    const { activity, intensity, type, activity_id } = this.props.route.params;
    // ** หมายเหตุ ปัจจุบันใช้การคำนวน week ปัจจุบัน, - ซึ่งถ้าอนาคตมีการดูย้อนหลังสัปดาห์เก่า ต้องมาปรับปรุงส่วนนี้นะ -
    const week_in_program = calculateWeekInProgram(user && user.start_date);
    if (statusUpdateNumbComp !== "loading" && duration) {
      this.props.updateNumberCompleted(
        user && user.user_id,
        activity_id && activity_id === "cardio" ? "cardio" : intensity,
        week_in_program,
        activity,
        intensity,
        type,
        duration,
        note
      );
    }
  }

  render() {
    const {
      stsusColor,
      isModalVisible2,
      isModalConter2,
      study,
      activity,
      intensity,
      type,
      duration,
      note,
      statusLoading,
    } = this.state;
    const { statusUpdateNumbComp } = this.props;
    /*     const date = new Date();
    
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const currentDate = `${day}-${month}-${year}`; */
    const currentDate = currentTime();

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.fill}>
          <View
            style={{
              height: 58,
              zIndex: 10,
              width: "100%",
              backgroundColor: colors.white,
            }}
          >
            <StatusBar barStyle="dark-content" />
          </View>
          <View
            style={{ height: 48, width: "100%", backgroundColor: colors.white }}
          >
            <View style={{ marginLeft: 16 }}>
              {/*           //  this.props.navigation.dispatch(StackActions.replace('Home')) */}
              <Pressable onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../../assets/images/icon/caret.png")}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.boxConter}>
            <View style={styles.missionView}>
              <Image
                style={styles.activityImage}
                source={
                  intensity === "light_intensity"
                    ? require("../../assets/images/activity/Activitylow.png")
                    : intensity === "moderate_intensity"
                    ? require("../../assets/images/activity/Activitycenter.png")
                    : require("../../assets/images/activity/Activityhign.png")
                }
              />
              <View style={styles.groupText}>
                <Text style={styles.headText}>{activity}</Text>
                <Text
                  style={[
                    styles.groupStatus,
                    {
                      color:
                        intensity === "light_intensity"
                          ? colors.secondary_MayaBlue
                          : intensity === "moderate_intensity"
                          ? colors.tertiaryYellow
                          : colors.tertiaryMagenta,
                    },
                  ]}
                >
                  {intensity === "light_intensity" &&
                    `${t("low_concentration")}`}
                  {intensity === "moderate_intensity" &&
                    `${t("moderate_concentration")}`}
                  {intensity === "vigorous_intensity" &&
                    `${t("hight_concentration")}`}
                </Text>
              </View>
            </View>
            <View style={styles.viewIconRight}>
              {type !== "default" && (
                <Pressable onPress={() => this.props.navigation.goBack()}>
                  <Image
                    style={styles.chevronImage}
                    source={require("../../assets/images/activity/Chevron.png")}
                  />
                </Pressable>
              )}
            </View>
          </View>
          <View
            style={[styles.boxConter2, { justifyContent: "space-between" }]}
          >
            <View>
              <View style={styles.rowDetails}>
                <Image
                  style={styles.chevronImage}
                  source={require("../../assets/images/activity/Calendar.png")}
                />
                <Text style={styles.textDetails}>
                  {currentDate}
                  {/* 31 ธ.ค. 2566 - 17:50 น. */}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: colors.grey6,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <View style={styles.rowDetails}>
                <Image
                  style={styles.chevronImage}
                  source={require("../../assets/images/activity/Clock.png")}
                />
                {/*  <Text style={styles.textDetails}>60 นาที</Text> */}
                <TextInput
                  style={[styles.textDetails, { width: "100%" }]}
                  onChangeText={(text) => this.setState({ duration: text })}
                  value={duration}
                  keyboardType="numeric"
                  placeholder={t("time_spent")}
                />
                <Text
                  style={[
                    styles.textDetails,
                    { position: "absolute", marginLeft: 150 },
                  ]}
                >
                  {t("minute")}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: colors.grey6,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
              <View style={styles.rowDetails}>
                <Image
                  style={styles.chevronImage}
                  source={require("../../assets/images/activity/Note.png")}
                />
                {/*  <Text style={styles.textDetails}>เดินกินลมม</Text> */}
                <TextInput
                  style={[styles.textDetails, { width: "100%" }]}
                  onChangeText={(text) => this.setState({ note: text })}
                  value={note}
                  placeholder={t("note")}
                />
              </View>
              <View
                style={{
                  borderBottomColor: colors.grey6,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </View>
            {/*  <View style={{ alignItems: "center" }}>
                        <Pressable onPress={() => this.toggleModal(isModalVisible)} >
                            <Text style={styles.deleteActivity}>ลบกิจกรรมนี้</Text>
                        </Pressable>
                    </View> */}
            <View
              style={[styles.missionView, { marginTop: 32, marginBottom: 40 }]}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  duration != "" || note != ""
                    ? this.toggleModal(isModalVisible2)
                    : this.props.navigation.goBack();
                }}
              >
                <View style={styles.buttonWhite}>
                  <Text style={styles.textButtonWhite}>{t("abandon")}</Text>
                </View>
              </TouchableWithoutFeedback>
              {statusUpdateNumbComp !== "loading" ? (
                <TouchableWithoutFeedback onPress={() => this.saveMission()}>
                  <View style={styles.buttonBlue}>
                    <Text style={styles.textButtonRed}>{t("record")}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <View style={styles.buttonBlue}>
                  <Text style={styles.textButtonRed}>{t("record")}</Text>
                </View>
              )}
            </View>
          </View>

          {isModalVisible2 === true ? (
            <View>
              <Pressable
                title="Show modal"
                onPress={() => this.toggleModal(isModalVisible2)}
              />
              <Modal isVisible={isModalVisible2} style={{ margin: 0 }}>
                <View
                  View
                  style={{ flex: 1, justifyContent: "flex-end" }}
                  onPress={() => this.toggleModal(isModalVisible2)}
                >
                  <View style={styles.modalView}>
                    <Text style={styles.headModal}>{t("leave_now")}</Text>
                    <View
                      style={[
                        styles.missionView,
                        { marginTop: 32, marginBottom: 40 },
                      ]}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => this.toggleModal(isModalVisible2)}
                      >
                        <View style={styles.buttonWhite}>
                          <Text style={styles.textButtonWhite}>
                            {t("backward")}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => this.deleteActivity2(isModalConter2)}
                      >
                        <View style={styles.buttonRed}>
                          <Text style={styles.textButtonRed}>
                            {t("abandon")}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          ) : null}

          {statusLoading === true && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                zIndex: 50,
                backgroundColor: colors.grey1,
                opacity: 0.8,
              }}
            >
              <ActivityIndicator
                size="large"
                color="#59CBE4"
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.grey7,
  },
  boxConter: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  missionView: {
    flexDirection: "row",
  },
  activityImage: {
    width: 32,
    height: 32,
    marginTop: 16,
    marginLeft: 16,
  },
  headText: {
    marginTop: 15,
    marginLeft: 13,
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize20,
    color: colors.grey1,
  },
  headText2: {
    marginTop: 15,
    marginLeft: 16,
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize16,
    color: colors.grey1,
  },
  headText3: {
    marginTop: 15,
    marginLeft: 16,
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize16,
    color: colors.grey2,
  },
  groupText: {
    flexDirection: "column",
    paddingBottom: 24,
  },
  groupText2: {
    flexDirection: "column",
  },
  groupStatus: {
    fontFamily: "IBMPlexSansThai-Regular",
    fontSize: ComponentsStyle.fontSize14,
    marginLeft: 16,
  },
  chevronImage: {
    width: 24,
    height: 24,
  },
  viewIconRight: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  viewIconRight2: {
    marginTop: -10,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  boxConter2: {
    paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: colors.white,
    /*        height: "100%" */
    flex: 1,
  },
  textDetails: {
    fontFamily: "IBMPlexSansThai-Regular",
    fontSize: ComponentsStyle.fontSize16,
    marginLeft: 20,
  },
  rowDetails: {
    flexDirection: "row",
    marginBottom: 24,
    marginTop: 24,
  },
  deleteActivity: {
    marginBottom: 54,
    color: colors.negative1,
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize16,
  },
  modalView: {
    position: "relative",
    zIndex: 3,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 16,
    height: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    marginBottom: 0,
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
  },
  headModal: {
    marginTop: 32,
    textAlign: "center",
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize20,
    color: colors.grey1,
  },
  buttonWhite: {
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: 24,
    height: 48,
    borderColor: colors.persianBlue,
    borderWidth: 2,
  },
  modalViewConter: {
    position: "relative",
    zIndex: 3,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 16,
    height: "90%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    marginBottom: 0,
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24,
  },
  textButtonWhite: {
    color: colors.persianBlue,
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  buttonRed: {
    marginLeft: 16,
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.negative1,
    borderRadius: 24,
    height: 48,
    borderColor: colors.negative1,
    borderWidth: 2,
  },
  textButtonRed: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  buttonBlue: {
    marginLeft: 16,
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.persianBlue,
    borderRadius: 24,
    height: 48,
    borderColor: colors.persianBlue,
    borderWidth: 2,
  },

  cross: {
    width: 16,
    height: 16,
    marginLeft: 2,
  },
  headActivity: {
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
    color: colors.grey1,
  },
  headEdit: {
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
    color: colors.persianBlue,
  },
  textHeadConter: {
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  boxHeadingActive: {
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: "25%",
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: colors.persianBlue,
  },
  boxHeading: {
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: "25%",
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: colors.grey4,
  },
  sectionActive: {
    color: colors.persianBlue,
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Bold",
    width: "25%",
    textAlign: "center",
  },
  section: {
    color: colors.grey3,
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Bold",
    textAlign: "center",
  },
});

const mapStateToProps = ({ authUser, getData, updateData }) => {
  const { user } = authUser;
  const { activity_list, statusGetActivityList } = getData;
  const { statusUpdateNumbComp } = updateData;
  return { user, activity_list, statusGetActivityList, statusUpdateNumbComp };
};

const mapActionsToProps = {
  getActivityList,
  updateNumberCompleted,
  getExerciserActivity,
  resetStatusUpdateNumbComp,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withTranslation()(ExAddActivity));
