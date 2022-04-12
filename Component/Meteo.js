import React from "react";
//import JSONPretty from "react-json-pretty";
import {
  View,
  Image,
  TextInput,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import getEphemeride from "../API/MeteoApi";
import temps from "./temps";

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#ffff4f",
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#346",
    borderWidth: 1,
    paddingLeft: 5,
  },

  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

class Meteo extends React.Component {
  //La class représente une connexion avec le serveur de base de données.
  constructor(props) {
    //constructor est une méthode qui est utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class.
    super(props);
    this.state = {
      Ephemeride: [],
      height: 0,
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    };
  }

  _searchEphemeride() {
    // setState est une fonction asychrone
    // Pour améliorer les performances React peut en différer les traitements
    // Elle prend un deuxième paramètre
    //      une fonction callback qui est appelée lorsque tout est prêt
    this.setState(
      {
        Ephemeride: [],
        prevision: {},
      },
      () => {
        console.log(this.state.Ephemeride.length);
        this._loadEphemeride();
      }
    );
  }

  // Bien noter les deux setState
  //   isLoading: True puis appel API puis lorsque l'API a répondu isLoading: False
  _loadEphemeride() {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
      });
      getEphemeride(this.searchedText).then((data) => {
        this.setState({
          // ... syntaxe Javascript ES6 qui permet de recopier
          // et de fusionner les deux tableaux
          // ⟺ Ephemeride: this.state.Ephemeride.concat(data.results)
          Ephemeride: data.e,
          prevision: data.f,
          isLoading: false,
        });

        console.log(
          "--_loadEphemeride\n" +
            JSON.stringify(data) +
            "\n_loadEphemeride--" +
            "\n--_loadEphemeride--"
        );
      });
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      );
    }
  }

  render() {
    const Ephemerid = this.props.Ephemerid;
    if (this.state.Ephemeride.ephemeride) {
      return (
        <SafeAreaView style={styles.main_container}>
          <TextInput
            onSubmitEditing={() => this._searchEphemeride()}
            //onSubmitEditing: rappel appelé quand le bouton d'envoi de l'entrée de texte est enfoncé.
          />
          {/* <View> */}
          <Button
            title="Ephéméride à Strasbourg"
            onPress={() => this._searchEphemeride()}
          />
          {/* <JSONPretty id="json-pretty" data={this.state.prevision}></JSONPretty>
           */}
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../Assets/meteo.png")}
            ></Image>
            <Text>
              {"Lever du soleil : " + this.state.Ephemeride.ephemeride.sunrise}
            </Text>
            <Text>
              {"Coucher du soleil : " + this.state.Ephemeride.ephemeride.sunset}
            </Text>
            <Text>
              {"Lumière du jour : " +
                this.state.Ephemeride.ephemeride.duration_day}
            </Text>
            <Text>
              {"Phase de la lune : " +
                this.state.Ephemeride.ephemeride.moon_phase}
            </Text>
            <Text>{"Date : " + this.state.prevision.forecast.datetime}</Text>
            <Text>
              {"Proba. de pluie (%) : " +
                this.state.prevision.forecast.probarain}
            </Text>
            <Text>
              {"Vitesse du vent : " + this.state.prevision.forecast.wind10m}
            </Text>
            <bText>
              {"Prévision météo : " +
                this.state.prevision.forecast.weather +
                " " +
                temps[this.state.prevision.forecast.weather]}
            </bText>
            <Text>
              {"Température : " +
                this.state.prevision.forecast.tmin +
                "°C - " +
                this.state.prevision.forecast.tmax +
                "°C"}
            </Text>
          </View>
          {/* </View> */}
          {this._displayLoading()}
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.main_container}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../Assets/meteo.png")}
          ></Image>
          <TextInput
            onSubmitEditing={() => this._searchEphemeride()}
            //onSubmitEditing: rappel appelé quand le bouton d'envoi de l'entrée de texte est enfoncé.
          />
          {/* <View> */}
          <Button
            title="Ephéméride à Strasbourg"
            onPress={() => this._searchEphemeride()}
          />
          {this._displayLoading()}
        </SafeAreaView>
      );
    }
  }
}

export default Meteo;
