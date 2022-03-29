// Components/FilmItem.js
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import dayjs from 'dayjs'
/* import 'react-json-pretty/themes/adventure_time.css'
import JSONPretty from 'react-json-pretty' */

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    console.log('test:' + this.props.film.title)
    return (
      <View>
        <View style={styles.film_main_container}>
          <Image style={styles.image} source={film.poster_path} />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text}>{film.overview}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>
                {dayjs(film.release_date).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  film_main_container: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  content_container: {
    flex: 1,
    margin: 5,
    backgroundColor: '#EE11',
  },
  header_container: {
    backgroundColor: '#EE33',
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    backgroundColor: '#EE44',
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
    textAlign: 'right',
    backgroundColor: '#88EE88',
  },
  description_container: {
    flex: 7,
    backgroundColor: '#EEFF',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 2,
    backgroundColor: '#EEFFAA',
  },
  date_text: {
    textAlign: 'right',
    fontSize: 22,
  },
})

export default FilmItem
