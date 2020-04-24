import * as React from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Surface } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { Routes } from "../../routes";

export interface CardScreenProps {
  navigation?: StackNavigationProp<any>;
}

const usplashImageList = [
  "https://images.unsplash.com/photo-1518873890627-d4b177c06e51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1587577801970-837ea2424ceb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1587582345426-bf07f534b063?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1462400362591-9ca55235346a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1617&q=80",
  "https://images.unsplash.com/photo-1587588354737-4fb569ab499f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "https://images.unsplash.com/photo-1587580186465-663db0a4c222?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2091&q=80",
];
const CardScreen: React.SFC<CardScreenProps> = props => {
  const list = Array(6)
    .fill("")
    .map((item, index) => {
      return (item = {
        title: `Card title #${index + 1}`,
        content: `Card content #${index + 1}`,
        subtitle: `Card subtitle #${index + 1}`,
        key: String(Math.random() * 1000),
        uri: usplashImageList[index],
      });
    });

  return (
    <Surface>
      <FlatList
        data={list}
        renderItem={({ item: { subtitle, title, content, uri } }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation?.push(Routes.details, {
                  subtitle,
                  title,
                  content,
                  uri,
                })
              }
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{title}</Title>
                  <Paragraph>{content}</Paragraph>
                </Card.Content>
                <Card.Cover style={styles.cover} source={{ uri }} />
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.key}
      />
    </Surface>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
  },
  cover: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
