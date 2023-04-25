import React, { Component } from 'react';
import { View, StyleSheet, Pressable, Image, Text, Dimensions } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';
import { getNutritionKnowledge } from "../../redux/get";
import { connect } from 'react-redux';




class Gn4 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nutrition_knowledge: null,
            dataMassage: null,
        };
    }
    componentDidMount() {
        this.props.getNutritionKnowledge()
    }

    componentDidUpdate(prevProps, prevState) {
        const { statusNutritionKnowledge, nutritionKnowledge } = this.props;

        if (prevProps.statusNutritionKnowledge !== statusNutritionKnowledge && statusNutritionKnowledge === "success") {

            this.setState({
                nutrition_knowledge: nutritionKnowledge && JSON.parse(nutritionKnowledge[0].knowledge),
                assess_behavior: nutritionKnowledge && JSON.parse(nutritionKnowledge[0].assess_behavior)
            })
        }
    }



    renderImg(mission_id, img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/${mission_id}/${mission_id}_${img_index}.jpg`
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={(size === 'md') ? styles.boxImage : styles.boxImage2}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        source={{ uri: imgUrl }}
                        resizeMode='stretch'
                    />
                </View>
            </View>
        )
    }

    onSelected(indexType, index, chonice, score) {

        const { nutrition_knowledge } = this.state;

        nutrition_knowledge.forEach((item, i) => {
            if (item.indexType === indexType) {
                item.data.forEach((question, j) => {
                    if (j === index - 1) {
                        question.selected = chonice;
                    }
                });
            }
        });
        this.setState({
            nutrition_knowledge: nutrition_knowledge
        })

    }

    onAssessBehavior() {
        const { nutrition_knowledge } = this.state;
        const { nutritionKnowledge } = this.props;
        const assess_behavior = nutritionKnowledge && JSON.parse(nutritionKnowledge[0].assess_behavior)
        let dataArr = []
        nutrition_knowledge.map((item, i) => {
            if (item.indexType === i + 1) {
                let data = item.data;
                let arr = [];
                data.map((value, k) => {
                    var choice = [value.choice]
                    /* console.log(value.selected); */
                    choice.map((chonices, k) => {
                        if (value.selected == "a") {
                            arr.push(chonices.a.score)
                        }
                        if (value.selected == "b") {
                            arr.push(chonices.b.score)
                        }
                        if (value.selected == "c") {
                            arr.push(chonices.c.score)
                        }
                    })
                })
                dataArr[i] = arr

            }
        })
        let sums = dataArr.map((arr) => arr.reduce((sum, val) => sum + val, 0));
        const dataMassage = [];
        assess_behavior && assess_behavior.map((item, i) => {
            if (item.indexType === i + 1) {
                let data = item.data;
                let dataMess = data.filter((value, l) => {
                    if ((sums[item.indexType - 1] >= value.minScore) && (sums[item.indexType - 1] <= value.maxScore)) {
                        return value.message;
                    }
                });
                /*   console.log(dataMassage); */
                if (dataMess.length > 0) {
                    dataMassage[i] =
                    {
                        "type": item.type,
                        "message": dataMess[0].message
                    }
                }



            }
        })

        if (dataMassage.length > 0) {
            this.setState({
                dataMassage: dataMassage
            })
        }
        /*         console.log("dataMassage", dataMassage); */


    }



    render() {

        const { nutrition_knowledge, dataMassage } = this.state;

        return (
            <View style={styles.scrollViewbox} >
                {
                    this.renderImg('GN4', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    การรับประทานอาหารถือเป็นปัจจัยหนึ่งของการ
                    เกิดโรคไม่ติดต่อเรื้อรัง (NCDs : Non-Communicable Diseases) เช่น เบาหวาน ความดันโลหิตสูง ไขมันในเลือดสูง เป็นต้น ซึ่งหากมีการปรับพฤติกรรมการรับประทานอาหารให้เหมาะสมจะเป็นตัวช่วยในการลดความเสี่ยงของการเกิดโรคต่าง ๆ ได้{'\n'}
                    {'\n'}
                    มาลองให้คะแนนพฤติกรรมการรับประทานอาหารของตนเองว่าอยู่ในระดับไหน...
                </Text>

                {
                    nutrition_knowledge && nutrition_knowledge.map((item, i) => {
                        /*  console.log("item", item.data); */
                        return (
                            <>
                                <Text style={styles.textHead}>{item.type}</Text>
                                {
                                    item.data.map((value, j) => {
                                        var choice = [value.choice]
                                        return (
                                            <>
                                                <Text style={styles.content}>{value.question}</Text>
                                                {
                                                    choice.map((chonices, k) => {
                                                        return (
                                                            <>
                                                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                                                                    <Pressable onPress={() => this.onSelected(item.indexType, value.index, "a", chonices.a.score)} >
                                                                        <Image style={{ width: 24, height: 24 }} source={value.selected === "a" ? require('../../assets/images/icon/radioButtonActive.png') : require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    </Pressable>
                                                                    <Text style={[styles.textChoice, value.selected === "a" && { color: colors.positive1 }]}>{chonices.a.answer}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                                                                    <Pressable onPress={() => this.onSelected(item.indexType, value.index, "b", chonices.b.score)} >
                                                                        <Image style={{ width: 24, height: 24 }} source={value.selected === "b" ? require('../../assets/images/icon/radioButtonActive.png') : require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    </Pressable>
                                                                    <Text style={[styles.textChoice, value.selected === "b" && { color: colors.positive1 }]}>{chonices.b.answer}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                                                                    <Pressable onPress={() => this.onSelected(item.indexType, value.index, "c", chonices.c.score)} >
                                                                        <Image style={{ width: 24, height: 24 }} source={value.selected === "c" ? require('../../assets/images/icon/radioButtonActive.png') : require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    </Pressable>
                                                                    <Text style={[styles.textChoice, value.selected === "c" && { color: colors.positive1 }]}>{chonices.c.answer}</Text>
                                                                </View>

                                                            </>
                                                        )
                                                    })
                                                }
                                                {/* <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                                                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                    <Text style={styles.textChoice}>{value.choice}</Text>
                                                </View> */}
                                            </>
                                        )

                                        /*   console.log("value", value); */
                                    })
                                }
                                {/* <Text style={styles.content}>1. ดื่มน้ำเปล่า กาแฟดำ ชาไม่ใส่น้ำตาล โซดา</Text>
                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                    <Text style={styles.textChoice}>ทุกวัน/เกือบทุกวัน</Text>
                                </View> */}
                            </>
                        )
                    })
                }

                {
                    dataMassage ?
                        <Pressable>
                            <View style={[ComponentsStyle.buttonGrey, { marginTop: 32 }]} >
                                <Text style={ComponentsStyle.textButtonGrey}>
                                    ประเมินพฤติกรรม
                                </Text>
                            </View>
                        </Pressable> :
                        <Pressable onPress={() => this.onAssessBehavior()}>
                            <View style={[ComponentsStyle.button, { marginTop: 32 }]} >
                                <Text style={ComponentsStyle.textButton}>
                                    ประเมินพฤติกรรม
                                </Text>
                            </View>
                        </Pressable>
                }

                {
                    dataMassage && <Text style={styles.messageHead}>ผลการประเมิน</Text>
                }

                {
                    dataMassage && dataMassage.map((item, i) => (
                        <>

                            <Text style={styles.textHead}>{item.type}</Text>
                            <Text style={styles.textMessage}>{item.message}</Text>
                        </>
                    ))

                }
                {/*   <Text style={styles.textHead}>เป็นคน...หวานแค่ไหน ? ?</Text>
                <Text style={styles.content}>1. ดื่มน้ำเปล่า กาแฟดำ ชาไม่ใส่น้ำตาล โซดา</Text>
                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                    <Text style={styles.textChoice}>ทุกวัน/เกือบทุกวัน</Text>
                </View> */}
                {/*   {
                    this.renderImg('GN4', 2, 'lg')
                }
                {
                    this.renderImg('GN4', 3, 'lg')
                }
                {
                    this.renderImg('GN4', 4, 'lg')
                } */}
                <View style={[styles.areaViewText, { marginTop: 30, marginBottom: 40 }]}>
                    <Text style={{
                        color: colors.grey1,
                        fontSize: ComponentsStyle.fontSize16,
                        fontFamily: "IBMPlexSansThai-Regular",
                        textAlign: "center"
                    }}>{'Ref. (อ้างอิง)'}</Text>
                    <Text style={{
                        color: colors.grey1,
                        fontSize: ComponentsStyle.fontSize16,
                        fontFamily: "IBMPlexSansThai-Regular",
                        textAlign: "center"
                    }}>{`Campbell , B. (2021). NSCA's guide to sport and exercise nutrition, 2nd edition.`}</Text>
                </View>
            </View >
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center"

    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,

    },
    content: {
        marginTop: 32,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    textHead: {
        marginTop: 32,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: "#000000"
    },
    textChoice: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey3,
        marginLeft: 8,

    },
    textMessage: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
    },
    boxImage: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 400 : 208
    },
    boxImage2: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 1100 : 350,
    },
    messageHead: {
        textAlign: "center",
        marginTop: 72,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: "#000000"
    }
})



const mapStateToProps = ({ getData, authUser }) => {
    const { statusNutritionKnowledge, nutritionKnowledge } = getData;
    const { user, statusUpdateDisplayName } = authUser;
    return { statusNutritionKnowledge, nutritionKnowledge, user, statusUpdateDisplayName };
};

const mapActionsToProps = { getNutritionKnowledge };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(Gn4);

