import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { grabAllProducts } from "./Data/shopData";
import { useRouter } from "expo-router";
import ShopItem from "../components/ShopItem";
const windowDimensions = Dimensions.get('window').height

const Shop = () => {
    

    const [products, setProducts] = useState();
    useEffect(() => {
        setProducts(grabAllProducts());
    }, [])



    return (
        <View style={styles.conatiner}>
            <Text style={styles.title}>All Items In The Shop</Text>

            <FlatList
                data={products}
                renderItem={({ item }) => <ShopItem {...item} />}
                keyExtractor={item => item.productId}
            />
        </View>
    )
}

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
    // height: windowDimensions - 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

})