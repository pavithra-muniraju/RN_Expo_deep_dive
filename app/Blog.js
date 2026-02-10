import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { BlogData } from "./Data/blogData";
import { useRouter } from "expo-router";

const BlogItem = ({ id, postTitle, postAuthor, postImage }) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => {
            router.replace({
                pathname: '/BlogDetail',
                params: { selectedBlog: id }
            })
        }}>
            <View style={styles.blogRow}>
                <Image source={postImage} style={styles.image} />
                <Text style={styles.storyTitle}>{postTitle}</Text>
                <Text style={styles.storySnippet}>- {postAuthor}</Text>
            </View>
        </TouchableOpacity>
    )
}
const Blog = () => {
    const [blogData, setBlogData] = useState([]);

    const [isLoading, setIsLoading] = useState(true)
    

    const getBlogs = async () => {
        try{
            const response = await fetch('http://10.38.233.171:3000/posts');
            const allPost = await response.json();
            console.log(allPost);
            setBlogData(allPost);
        } catch(error ){
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // setBlogData(BlogData); hardcodded data
        getBlogs(); // eg of actaul api call
    }, []);  

    if(isLoading) {
        return <ActivityIndicator />
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BPS BLOG</Text>

            <FlatList
                data={blogData}
                renderItem={({ item }) => <BlogItem {...item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Blog;
const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ffcec7',
        paddingBottom: 290
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center'
    },
    blogRow: {
        marginVertical: 10,
        borderTopWidth: 1,
        cursor: 'pointer'
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
        // paddingTop: 10,
        fontWeight: '700',
        textAlign: 'center'
    },
    storySnippet: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        // paddingBottom: 10
    }
})