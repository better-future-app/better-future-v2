import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHight = Dimensions.get("window").height;
const color = ["red", "#66CCFF", "#FFCC00", "#1C9379", "#8A7BA7"];

randomColor = () => {
  let col = color[Math.floor(Math.random() * color.length)];
  return col;
};
const styleSheet = StyleSheet.create({
  header: {
    color: "#ffffff",
    backgroundColor: "#00a46c",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  header_text: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#FFF",
    paddingTop: 25,
  },
  image: {
    height: 250,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: 160,
  },
  news: {
    borderRadius: 10,
    height: 230,
    width: 280,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 20,
    borderRadius: 15,
  },
  more_buttom: {
    backgroundColor: "#00a46c",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
  },
  card: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  news_card: {
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  news_Page: {
    marginTop: 20,
    borderRadius: 10,
    height: 230,
    width: 280,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: 50,
    borderRadius: 15,
  },
  company_overall: {
    height: 150,
    elevation: 2,
    backgroundColor: "#FFF",

    marginTop: "5%",
    borderRadius: 15,
    marginLeft: 10,
    width: windowWidth - 20,
  },

  company_status: {
    flexDirection: "row",
    fontWeight: "100",
    color: "#000000",
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  company_risk: {
    color: "#000000",
    fontSize: 12,
    paddingTop: 14,
    paddingLeft: 30,
  },
  company_ranking: {
    height: 180,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: "5%",
    borderRadius: 15,
    marginLeft: 10,
    width: windowWidth - 20,
  },
  company_esg_score_card: {
    height: 220,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: "5%",
    borderRadius: 15,
    marginLeft: 10,
    width: windowWidth - 20,
  },

  company_overallESG_text: {
    // fontWeight: "bold",
    color: "#000000",
    fontSize: 20,
    padding: 20,
  },
  profile_image: {
    height: 250,
    elevation: 30,
    backgroundColor: "#FFF",

    marginTop: 0,

    marginBottom: 20,
    width: 160,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").width * 0.75,
  },
  home_company_list: {
    height: 50,
    elevation: 5,
    backgroundColor: "#FFF",
    marginLeft: windowWidth - (windowWidth - 10),

    marginBottom: 2,
    width: windowWidth - 20,
  },
  home_company_text: {
    fontWeight: "bold",
    fontSize: 15,
    width: "80%",
    color: "#000000",
  },
  home_title: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#585a61",
    paddingBottom: 15,
    paddingTop: 15,
  },
  home_input: {
    fontWeight: "bold",
    fontSize: 19,
    width: 300,
  },

  home_news_image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  home_component: {
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  position_component: {
    flexDirection: "row",
    width: "95%",
    paddingTop: 10,
    alignItems: "center",
  },
  tutorial_title: {
    fontWeight: "100",
    fontSize: 18,
    color: "red",
  },
  Searchbar_size: {
    height: 45,
    elevation: 5,
    backgroundColor: "#FFF",
    width: windowWidth - 50,
    marginLeft: 25,
    borderRadius: 10,
  },
  searchbar: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 25,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  Searchbar_result: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  Searchbar: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 25,
    borderRadius: 15,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  position: {
    height: windowHight * 0.125,
    elevation: 2,
    backgroundColor: "#FFF",
    marginLeft: "5%",
    borderRadius: 15,
    marginLeft: 10,
    width: windowWidth - 20,
  },
  priceBar: {
    flexDirection: "row",
    width: windowWidth,
    justifyContent: "space-between",
  },
  backgrundrandomcolor: {
    backgroundColor: randomColor(),
  },
});

export default styleSheet;
