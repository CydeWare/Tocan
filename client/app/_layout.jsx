import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './index.jsx';
import AboutScreen from './about';
import NotFoundScreen from './+not-found';
import ProductDetailsScreen from "./productdetails.jsx";
import { Provider } from "react-redux";
import { store } from "../store/store.js";
import thunk from "redux-thunk";
import reducers from "../reducers/index.js";


// const store = createStore(reducers, compose(applyMiddleware(thunk)));


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// const Stack = createNativeStackNavigator();

function RootLayoutNav() {


  return (
    <Provider store={store}>
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name="index" options={{headerTitle: "Storegg", headerLeft: () => <></>}}  />
        <Stack.Screen name="about" options={{headerTitle: "About"}} />
        <Stack.Screen name="+not-found" options={{}} />
        <Stack.Screen name="productdetails" options={{}} />
        <Stack.Screen name="products" options={{}} />
        <Stack.Screen name="minigame" options={{}} />
      </Stack>
    </Provider>
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="index" component={Home}   />
      //     <Stack.Screen name="about" component={AboutScreen}  />
      //     <Stack.Screen name="+not-found" component={NotFoundScreen}  />
      //     <Stack.Screen name="productdetails" component={ProductDetailsScreen} />
      //   </Stack.Navigator>
      // </NavigationContainer>

  );
}
