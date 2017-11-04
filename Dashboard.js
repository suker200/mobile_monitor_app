import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  StyleSheet,
  View,
  TextInput,
  ListView,
  Button,
  RefreshControl
 } from 'react-native';

import ApiUtils from './ApiUtils'

var invervalID = ''

var Person = {
  endpoint: '',
  username: '',
  password: '',
  isLoggingIn: false,
  message: '',
  token: ''
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      token: '',
      endpoint: '',
      intervalID: '',
    };
  }

  _validateURL(url) {
    var re = /(^(http|https)\:\/\/)/;
    return re.test(url)
  }

  async _updateToken() {
    this.setState({
      token: await AsyncStorage.getItem('token'),
      endpoint: await AsyncStorage.getItem('endpoint')
    });
  }
  
  componentWillMount() {
    this._updateToken()
    setTimeout(this.fetchData.bind(this), 2000)
  }

  componentDidMount() {
    invervalID = setInterval(() => {
      this.fetchData();
    }, 60000);
  }

  // We remove internval because this run in async, and set value when we get out of this DOM
  componentWillUnmount(){ 
    clearInterval(invervalID);
  }

  fetchData() {
    if (this._validateURL(this.state.endpoint)) {
      // this._userSignin();
      fetch(this.state.endpoint + "/auth/v1/app", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token
        }
      })
      .then((response) => response.json())
      .then(ApiUtils.checkStatus)
      .then((responseData) => {
        if (responseData.auth) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.infos),
            loaded: true,
          });        
        } else {
          this._updateToken()
        }
        console.log(responseData);
      })
      .catch((error) => {
        console.warn(error);
      });
      // .done();
    } else {
      this._updateToken()
      console.warn("endpoint " + this.state.endpoint + " is not valid")
    }
  }

  render() {
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderInfo.bind(this)}
        style={styles.listView}
        loaded={false}
        refreshControl={
          <RefreshControl
            enableEmptySections={ true }
            automaticallyAdjustContentInsets={ false }
            refreshing={false}
            onRefresh={() => {
              this.fetchData();
            }}
          />
        }
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading info...
        </Text>
      </View>
    );
  }

  renderInfo(info) {
    const { navigate } = this.props.navigation;
    return(
      <Button
        onPress={() => navigate('IssueInfo', {issue: info.issue, title: info.title, alias: info.alias })}
        title={info.alias}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

