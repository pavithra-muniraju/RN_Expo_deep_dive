import {createContext, useState} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { grabOneProduct } from './Data/shopData';

export const BethanyContext = createContext(null);

export const BethanyProvider = (props) =>  {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [cartLoaded, setCartLoaded] = useState(false);

    // counter for no of items in cart
    const [cId, setCid] = useState(1);

    const toggleCart = () => {
        if(cartLoaded) {
            router.push("/Cart")
        } else {
            Alert.alert('No Items in the cart')
        }
    }

    const addToCart = (productId) => {
        const product = grabOneProduct(productId);
        setCid(cId + 1);
        setCartItems([
            ...cartItems, 
            {
                cartId: cId,
                id: product.productId,
                productName: product.productName,
                productPrice: product.productPrice,
                quantity: 1
            }
        ])
        setCartLoaded(true);
        Alert.alert(`${product.productName} Added to cart`)
    }

    const getCartCount = () => {
        return cartItems.length;
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, prod) => (total + prod.productPrice), 0)
    }

    const cancelOrder = () => {
        setCartItems([]);
    }

    const processOrder = () => {
        // let tmpTotal = Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD' }).format(getCartTotal());
        
        Alert.alert(`Order Amount: ${getCartTotal()}`);
        setCartItems([]);
    }

    const removeCartItems = (cId) => {
        setCartItems(
           cartItems.filter(product => product.cartId !== cId)
        )
    }
    
    const checkCart = () => {
        if(cartItems.length === 0) {
            setCartLoaded(false);
            router.replace('/')
        }
    }
    const toggleLogin = () => {
        if (isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', () => {
                setIsLoggedIn(false);
                setLoggedUser('');
                Alert.alert('User logged out');
            })
        }
        else {
            router.push('/Login');
        }
    };

    const getUser = () => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if ( result==='none') {
                console.log('No one logged in');
            }
            else if (result===null) {
                AsyncStorage.setItem('userLoggedIn', 'none', () => {
                    console.log('Set user to NONE')
                });
            }
            else {
                setIsLoggedIn(true);
                setLoggedUser(result);
                console.log('logged in user: ',loggedUser)
                console.log('Watching : ', isLoggedIn) 
            }
        });
    };
 


  return (
    <BethanyContext.Provider 
      value={{toggleLogin,
        getUser, isLoggedIn, setIsLoggedIn, loggedUser,
    cartItems, 
        cartLoaded,  
        toggleCart, 
        addToCart, 
        getCartCount, 
        getCartTotal, 
        setCartItems,
        cancelOrder,
        processOrder,
        removeCartItems,
        checkCart}}
    >
      {props.children}
    </BethanyContext.Provider>
  );
}