import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, Platform, StyleSheet, Text, View } from "react-native";
import { BethanyContext } from "./ContextPRovider";


const Cart = () => {
    const { getCartTotal, cartItems, cancelOrder, processOrder, removeCartItems, checkCart } = useContext(BethanyContext);

    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        checkCart();
        setTotalCost(getCartTotal);
    }, [cartItems])

    const formatedTotal = Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(totalCost);

    const RenderProducts = ({ cartId, productName, productPrice }) => {
        const itemRemove = () => {
            removeCartItems(cartId);
        }

        return (
            <View style={styles.productRow}>
                <Text style={styles.prInfo}>{productName}</Text>
                <Text style={styles.prInfo}>{productPrice}</Text>
                <Button onPress={itemRemove} title="REMOVE ITEM" color='#de0909' />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart Items</Text>
            <Text style={styles.totalCost}>TOTAL: {formatedTotal}</Text>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <RenderProducts {...item} />}
                keyExtractor={item => item.cartId}
            />
            <View style={styles.buttonRow}>
                <Button title="CANCEL ORDER" onPress={cancelOrder} color='#de0909' />
                <Button title="PROCESS ORDER" onPress={processOrder} color='#1ed662' />
            </View>
        </View>
    )
}

export default Cart;

const styles = StyleSheet.create({
    
    productRow: {
        flexDirection: 'row',
         justifyContent: 'space-evenly',
         width: '100%',
         alignItems: 'center',
         paddingVertical: 20,
        ...Platform.select({
            android: {
               borderWidth: 1
            },
            ios: {
              borderWidth: 1
            },
            default: {
              paddingBottom: 80
            }
        })
    },
    prInfo: {
        fontSize: 16,
        fontWeight: '700',
        paddingVertical: 10,
        textAlign: 'center',
        ...Platform.select({
            android: {
                paddingHorizontal: 10,
            },
            ios: {
                paddingHorizontal: 10
            },
            default: {
                paddingHorizontal: 30
            }
        })

    },
    title: {
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: '900',
        fontSize: 20
    },
    container: {
        paddingBottom: 30
    },
    totalCost: {
        fontSize: 20,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        paddingBottom: 30
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingBottom: 20
    }
})