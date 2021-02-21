import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet } from "react-native"

class FilmItem extends Component {
    render() {
        return (
            <ScrollView style={styles.main_container}>
                <Text style={styles.title_text}>Titre du film</Text>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        height: 190
    },
    title_text: {
        color: 'black'
    }
})
export default FilmItem;
