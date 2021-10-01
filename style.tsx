import { StyleSheet } from "react-native";
import { commonDimensions } from "../../theme/commonDimensions";

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  img: {
    width: commonDimensions.MY_DIMENSION_IMG_GENRES_WIDTH,
    height: commonDimensions.MY_DIMENSION_IMG_GENRES_HEIGHET,
    margin: 3,
    borderRadius: 15,
  },
  text: { marginTop: "45%", fontSize: 20 },
});
export default styles;
