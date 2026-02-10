import { useEffect, useState } from "react"
import { ActivityIndicator, Image, Platform, StyleSheet, Text, View } from "react-native"
import { BlogData } from "./Data/blogData";
import { useLocalSearchParams, useRouter } from "expo-router";

const BlogDetail = () => {
    const [post, setPost] = useState({});
    const { selectedBlog } = useLocalSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getPost = async() => {
        try {
            const response = await fetch(`http://10.38.233.171:3000/posts/${selectedBlog}`);
        const postData = await response.json();
        setPost(postData);
        } catch(error) {
            console.error(error);
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {       
        // const blogData = BlogData.filter(item => item.id == selectedBlog)[0];
        // setPost(blogData);
        getPost(); // actual api call
        console.log(selectedBlog, post)
        
    },[])

    if(isLoading) {
        return <ActivityIndicator />
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detailed Blog Info</Text>

            <Image source={post.postImage} style={styles.postImage} />
            <Text style={styles.title}>{post.postTitle}</Text>
            <Text style={styles.author}> - {post.postAuthor}</Text>

            <Text style={styles.story}>{post.postContent}</Text>
            <Text style={styles.backbutton} onPress={() => { router.replace('/Blog') }} > - Back To Blog</Text>
        </View>
    )
}

export default BlogDetail;
const styles = StyleSheet.create({
    postImage: {
        width: '100%',
        resizeMode: 'cover',
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
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        paddingBottom: 10
    },
    author: {
        fontSize: 16,
        fontWeight: '600',
         textAlign: 'center',
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