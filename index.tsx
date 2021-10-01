import React, { FC, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { Strings } from "../../theme/string";
import styles from "./style";
import commonStyle from "../../theme/commonStyle";
import * as SecureStore from "expo-secure-store";
import { endPoint } from "../../theme/endPoint";
import { AntDesign } from "@expo/vector-icons";
import ButtonNext from "../../components/ButtonNext";

interface MyGenres {
  id: number;
  name: number;
  imagesPath: { path: string; default: number }[];
  createdAt: string;
  updatedAt: string;
}

interface Props {
  sendGenres: () => void;
}

const App: FC<Props> = (props) => {
  const [genres, setGenres] = useState<MyGenres[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const fetchCurrentUser = async () => {
    const token = await SecureStore.getItemAsync("secure_token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      endPoint.MY_HOST + endPoint.MY_PORT + endPoint.MY_USER_GET_GENRES,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setGenres(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchCurrentUserSelectedGenres = async () => {
    const token = await SecureStore.getItemAsync("secure_token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      endPoint.MY_HOST + endPoint.MY_PORT + endPoint.MY_USER_PATH,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        result.data.genres.forEach((element) => {
          setSelectedGenres((a) => [...a, element.id]);
        });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchCurrentUserSelectedGenres();
  }, []);

  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);

  return (
    <View>
      <ButtonNext
        title={Strings.MY_APP_DONE}
        onPress={() => props.sendGenres(selectedGenres)}
      ></ButtonNext>
      <FlatList
        data={genres}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={
              selectedGenres.includes(item.id)
                ? (e) => {
                    for (let i = selectedGenres.length; i >= 0; i--) {
                      if (selectedGenres[i] !== item.id) {
                        setSelectedGenres((a) => selectedGenres.splice(i, 1));
                      }
                    }
                  }
                : (e) => {
                    setSelectedGenres((a) => [...a, item.id]);
                  }
            }
          >
            <Image
              source={{
                uri:
                  "https://website.s3.us-east-2.amazonaws.com/" +
                  item.imagesPath.substring(9, 34),
              }}
              style={styles.img}
            />

            <View style={commonStyle.INPUT_ICON_ALIGN_LEFT}>
              {selectedGenres.includes(item.id) && (
                <AntDesign
                  name="check"
                  size={25}
                  color={"orange"}
                  position="absolute"
                />
              )}
            </View>
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default App;
