import React, { useState, useEffect } from "react";
import {
  I18nManager,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from "react-native";

import RNRestart from "react-native-restart";
import * as RNLocalize from "react-native-localize";
import I18n from "./i18n";

import Database from './db';
const db = new Database();

function Separator() {
  return <View
    style={{
      marginVertical: 20,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;
}

export default function Translate2() {

  const handleSetLanguage = (langugae) => {
    db.saveLanguage(langugae)
      .then((data) => {
        console.log('Language code successfully saved!')
        RNRestart.Restart()
      }).catch((err) => {
        console.log('Language code failed to save.')
      })
    // setstate(langugae)
    // I18n.locale = langugae;
    // RNRestart.Restart()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', }}>
      <Text style={{ textAlign: 'center' }}>{I18n.t("hello")}</Text>
      <Separator />
      <Button title='En' onPress={() => handleSetLanguage('en')} />
      <Separator />
      <Button
        title="Bm"
        color="#c4c4c4"
        onPress={() => handleSetLanguage('ms')}
      />
    </View>
  );

}