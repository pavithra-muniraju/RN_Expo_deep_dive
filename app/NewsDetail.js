import { Image, Platform, StyleSheet, Text, View } from "react-native"
import { grabOneStory } from "./newsData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const NewsDetail = () => {
    const router = useRouter();
  const { selectedStory } = useLocalSearchParams();
  const [story, setStory] = useState("");
  useEffect(() => {
    setStory(grabOneStory(selectedStory));
    console.log(story);
  })
    console.log(selectedStory)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Detailed News</Text>
            
            <Image source={story.storyImage} style={styles.image} />
            <Text style={styles.title}>{story.storyTitle}</Text>
            <Text style={styles.author}> - {story.author}</Text>

            <Text style={styles.story}>{story.story}</Text>
            <Text style={styles.backbutton} onPress={() => {router.back()}} > - Back To News</Text>
        </View>
    )
}

export default NewsDetail;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        ...Platform.select({
            android: {
                height: 200
            },
                default: {
                    height: 550
                }
            })
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '900'
    },
    author: {
        fontSize: 16,
        fontWeight: '600'
    },
    story: {
        fontSize: 14,
        fontWeight: '400',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontStyle: 'italic'
    },
    backbutton: {
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: '900',
        fontSize: 16,
        cursor: 'pointer'
    }
})