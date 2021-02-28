import React, { Component } from 'react'
import {
    View, StyleSheet, ActivityIndicator, ScrollView, Text, Image
} from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TheMovieDataBaseAPI';
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true  // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    //on récupère detail de notre film
    componentDidMount() {
        console.log("componentDidMount invoked - Component FilmDetail monté")
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            })
    }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container} >
                    <Image style={styles.image_container}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}
                    />
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                    </View>

                    <View style={styles.description_container}>
                        <Text style={styles.description_text}>{film.overview}</Text>
                    </View>

                    <View style={styles.release_date_container}>
                        <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View>
                        <Text style={styles.default_text}>Note: {film.vote_average}</Text>
                    </View>
                    <View>
                        <Text style={styles.default_text}>Nombre de votes: {film.vote_count}</Text>
                    </View>
                    <View>
                        <Text style={styles.default_text}>Budget: {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    </View>

                    {/*map pour parcourir les genres et companies */}
                    {/*et la fonction join pour les afficher les uns à la suite des autres et les séparer par un slash / */}
                    <Text style={styles.default_text}>Genre(s): {film.genres.map((genre) => {

                        return genre.name
                    }).join(" / ")}

                    </Text>

                    <Text style={styles.default_text}>Companie(s): {film.production_companies.map(company => {
                        return company.name
                    }).join(" / ")}
                    </Text>

                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        //console.log(this.props.navigation)
        console.log("Component FilmDetail rendu")
        // show object all what we want to show in FilmDetail:
        //console.log(this.state.film)
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
                {/*Détail du film {this.props.navigation.state.params.idFilm}   */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    //image
    image_container: {
        height: 169,
        margin: 5,
    },
    //title
    title_container: {
        alignItems: 'center'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    //description
    description_container: {
        flex: 1,
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    release_date_container: {
        marginTop: 0
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    }
})

export default FilmDetail;