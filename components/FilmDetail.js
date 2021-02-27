import React, { Component } from 'react'
import {
    View, StyleSheet, Text
} from 'react-native';

class FilmDetail extends Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text>
                    Détail du film
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

export default FilmDetail;