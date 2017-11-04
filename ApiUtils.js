import React from 'react';
import {
  Alert
 } from 'react-native';

var ApiUtils = {  
  checkLogin: function(response) {
  	// console.log(response)
  	if (response.status) {
	    if (response.status != 200) {
	      Alert.alert(
	        "Signin Failed!",
	        response.statusText
	      )
	    } else {
	      Alert.alert(
	        "Signin Successfully!"
	      )
	    }
  	}

  	if (response.code) {
	    if (response.code != 200) {
	      Alert.alert(
	        "Signin Failed!",
	        response.statusText
	      )
	    } else {
	      Alert.alert(
	        "Signin Successfully!"
	      )
	    }
  	}

  	if (response.token) {
	      Alert.alert(
	        "Signin Successfully!"
	      )  		
  	}

    return response;
  },

  checkStatus: function(response) {
  	if (response.infos) {
  		response.auth = true	
  	} else {
      Alert.alert(
        "Authen Failed!",
        response.statusText
      )
    	response.auth = false  		
  	}

    return response;
  }

};


export { ApiUtils as default };