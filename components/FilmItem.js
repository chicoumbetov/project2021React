import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from "react-native"

class FilmItem extends Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{ uri: "image" }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>Titre du film</Text>
                        <Text style={styles.vote_text}>Vote</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>Description</Text>
                        {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, 
                        il suffit de définir un nombre maximum de ligne */}
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le 00/00/0000</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //view globale of container
    main_container: {
        height: 190,
        flexDirection: 'row',
        borderWidth: 1,
        margin: 5
    },

    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'silver'
    },

    //right side of container
    content_container: {
        flex: 1,
        margin: 5
    },
    // À noter également que j'ai défini les tailles de mes containersheader_container ,  description_container  et   date_container avec le style flex ( flex: 3  ,  flex: 7  ,  flex: 1 )
    //header of right side
    header_container: {
        flex: 3,                //first part of column 
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    //main body of right side
    description_container: {
        flex: 7,                    //second part of column
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    //footer of right side
    date_container: {
        flex: 1,                    //third part of column
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default FilmItem;