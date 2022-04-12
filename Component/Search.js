import React from "react";
import JSONPretty from "react-json-pretty";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import getEphemeride from "../API/TMDBApi";

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
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

class Search extends React.Component {
  //La class représente une connexion avec le serveur de base de données.
  // ajouter la prop films, une liste vide au départ
  constructor(props) {
    //constructor est une méthode qui est utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class.
    super(props);
    this.state = {
      films: [],
      height: 0,
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    };
    this.searchedText = "";
    this.page = 0; // Compteur pour connaître la page courante
    this.totalPages = 0; // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API
  }

  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _searchEphemerides() {
    this.page = 0;
    this.totalPages = 0;

    // setState est une fonction asychrone
    // Pour améliorer les performances React peut en différer les traitements
    // Elle prend un deuxième paramètre
    //      une fonction callback qui est appelée lorsque tout est prêt
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(this.state.films.length);
        this._loadFilms();
      }
    );
  }

  // Bien noter les deux setState
  //   isLoading: True puis appel API puis lorsque l'API a répondu isLoading: False
  _loadFilms() {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
      });
      getEphemeride(this.searchedText, this.page + 1).then((data) => {
        // enlever le forceUpdate()          this.page = data.page
        this.totalPages = data.total_pages;
        this.setState({
          // ... syntaxe Javascript ES6 qui permet de recopier
          // et de fusionner les deux tableaux
          // ⟺ films: this.state.films.concat(data.results)
          films: data,
          isLoading: false,
        });

        console.log(
          "--_loadFilms\n" +
            JSON.stringify(data) +
            "\n_loadFilms--" +
            data.results[0].original_title +
            "\n--_loadFilms--"
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
    const film = this.props.film;
    return (
      <SafeAreaView style={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._searchEphemerides()}
          //onSubmitEditing: rappel appelé quand le bouton d'envoi de l'entrée de texte est enfoncé.
        />
        {/* <View> */}
        <Button
          title="Ephémérides à Strasbourg"
          onPress={() => this._searchEphemerides()}
        />
        <JSONPretty id="json-pretty" data={this.state.films}></JSONPretty>
        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>

        </View>
        {/* </View> */}
        {this._displayLoading()}
      </SafeAreaView>
    );
  }
}

export default Search;
