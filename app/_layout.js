import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router"
import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    setStatusBarBackgroundColor('#36302c', false);
    setStatusBarStyle('light');
    setStatusBarTranslucent(false);

    const [fontsLoaded, fontError] = useFonts({
        // 'Helvitica': require("../assets/fonts/Helvitaks.otf")
    });

    useEffect(() => {
        if(fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    },[fontsLoaded,fontError]);

    if(!fontsLoaded && !fontError) {
        return null
    }
    return(
        <SafeAreaView>
            <Header />
            <Slot />
            <Footer />
        </SafeAreaView>
    )
}

export default Layout;