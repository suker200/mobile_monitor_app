import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  FlatList,
} from 'react-native';

import { List, ListItem } from "react-native-elements";

export default class IssueInfo extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.alias}`,
  });

  render() {
    const { params } = this.props.navigation.state;

    return (
      <List>
        <FlatList
          data={params.issue}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item}`}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </List>
    );
  }

  renderIssue(item) {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    )
  }
}