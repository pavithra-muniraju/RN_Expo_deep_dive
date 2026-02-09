import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { grabOneProduct } from "./Data/shopData";

const windowDimensions = Dimensions.get('window').height

const ProductDetail = () => {
    const router = useRouter();
    const [product, setProduct] = useState({});

    const { selectedProduct } = useLocalSearchParams()
    useEffect(() => {
        console.log(selectedProduct)
        setProduct(grabOneProduct(selectedProduct));
        console.log(product)
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detailed View of Product</Text>
            <ScrollView>
                <Image source={product.productImage} style={styles.productImage} />
                <View style={styles.addButton}>
                    <Text style={styles.addText}> + ADD TO CART        </Text>
                </View>

                <View style={styles.product}>
                    <Text style={styles.productName}>{product.productName}</Text>
                    <Text style={styles.productName}>Rs. {product.productPrice}</Text>
                </View>
                <Text style={styles.productDescription}>{product.productDescription}</Text>
                <Text style={styles.backbutton} onPress={() => {router.back()}}>GO BACK TO ALL PRODUCTS</Text>
            </ScrollView>


        </View>
    )
}
export default ProductDetail;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    productImage: {
        width: '100%',
        resizeMode: 'cover',
        ...Platform.select({
            android: {
                height: 200,

            }, ios: {
                height: 200
            },
            default: {
                height: 450
            }
        })
    },
    addButton: {
        backgroundColor: '#ffcec7',
        fontWeight: '700',
        height: 30,
        // justifyContent: 'center',
    },
    addText: {
        fontWeight: '700',
    fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    product: {
        flexDirection: 'row',        
        paddingHorizontal: 10,
        ...Platform.select( {
            android: {

        justifyContent: 'space-between',
            },
            default: {
                justifyContent: 'space-evenly'
            }
        })
    },
    productName: {
        fontSize: 18,
        fontWeight: '900',
    },
    productDescription: {
        fontStyle: 'italic',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
        backbutton: {
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: '900',
        fontSize: 16
    
    }
})