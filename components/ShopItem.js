import { useRouter } from "expo-router";
import { Image, TouchableOpacity, Text, View, Platform, StyleSheet } from "react-native"

const ShopItem = ({ productId, productName, productImage, productPrice }) => {
    const router = useRouter();
    const addToCart = () => {

    }

    return (
        <View style={styles.continer}>
            <TouchableOpacity style={styles.productRow} onPress={() => {
                router.push({
                    pathname: '/ProductDetail',
                    params: { selectedProduct: productId }
                })
            }}>
                <Image source={productImage} style={styles.image} />
                <Text style={styles.button} onPress={addToCart}>+ Add to Cart</Text>
                <View style={styles.product}>
                    <Text style={styles.productInfo}>{productName}</Text>
                    <Text style={styles.productInfo}>Rs. {productPrice}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ShopItem;

const styles = StyleSheet.create({
    continer: {
       borderWidth: 1
    },
    image: {
        resizeMode: 'cover',

        paddingVertical: 10,
        ...Platform.select({
            android: {
                width: '100%',
                height: 200,
            },
            ios: {
                width: '100%',
                height: 200,
            },
            default: {
                width: '100%',
                height: 450
            }
        })
    },
    productRow: {
        
        marginTop: 30,
        cursor: 'pointer'
    },
    productInfo: {
        fontSize: 18,
        fontWeight: '700',
        paddingHorizontal: 10
    },
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...Platform.select({
            default: {
                justifyContent: 'space-evenly'
            }
        })
    },
    button: {
        backgroundColor: '#ffcec7',
        fontWeight: '700',
        textAlign: 'center',
        height: 30,
        justifyContent: 'center',
    }
})