import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import {grabAllStories} from './Data/newsData';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const NewsItem = ({storyId, storyTitle, storyImage, storySnippet}) => {
    const router = useRouter();
    return(
        <TouchableOpacity onPress={() => {
             router.push({
            pathname: '/NewsDetail',
            params: {selectedStory: storyId}
        })
        }}>
            <View style={styles.newsItem}>
                <Image source={storyImage} style={styles.image} />
                <Text style={styles.storyTitle}>{storyTitle}</Text>
                <Text style={styles.storySnippet}>{storySnippet}</Text>
            </View>
        </TouchableOpacity>
    )
}

const News = () => {

    const [story, SetStory] = useState([]);

    useEffect(() => {
        SetStory(grabAllStories());
    },[])
    return(
        <View style={styles.conatiner}>
            <Text style={styles.title}>BPS NEWS</Text>
                <FlatList data={story} renderItem={({item}) => <NewsItem {...item} />} 
                keyExtractor={item => item.storyId}  />
        </View>

    )
}

export default News;

const styles = StyleSheet.create({
    conatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffcec7',
        paddingBottom: 290    
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
newsItem: {
    paddingVertical: 10,    
    borderTopWidth: 1  
},
image: {
    width: '100%',
    
    ...Platform.select({
        android: {
            height: 200,
        },
        default: {
            height: 400
        }
    })

},
storyTitle: {
    fontSize: 18,
    paddingTop: 20,
    fontWeight: '700',
    textAlign: 'center'
},
storySnippet: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
}
})