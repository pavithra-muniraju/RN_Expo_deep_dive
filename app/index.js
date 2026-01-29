import {View, Text} from 'react-native';
import Header from './Header';
import Footer from './Footer';
const Home = () => {
    return (
        <View>
            <Header />
            <Text>Heelo from react</Text>
            <Footer/>
        </View>
    )
}

export default Home;