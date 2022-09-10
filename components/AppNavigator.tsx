import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { Ionicons } from '@expo/vector-icons';
import { captureMessage } from '@sentry/react-native';
import CalculatorScreen from '../screens/CalculatorScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CostScreen from '../screens/CostScreen';
import PayoffScreen from '../screens/PayoffScreen';
import { GOOGLE_ADMOB_PUBLISHER_ID } from '@env';

const Tab = createBottomTabNavigator();

const publisherID = GOOGLE_ADMOB_PUBLISHER_ID ? GOOGLE_ADMOB_PUBLISHER_ID : null;

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : publisherID;

captureMessage(`adUnitId in Dev Mode: ${__DEV__}`);
//console.log('adUnitId in Dev Mode:', __DEV__);

const AppNavigator = (): JSX.Element => {
    const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['mortgage loan', 'real estate']
    });

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (isClosed) load();
    }, [isClosed]);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: 'calculator' | 'calculator-outline' | 'pie-chart' | 'pie-chart-outline' | 'analytics' | 'analytics-outline' | 'cash-sharp' | 'cash-outline' = 'calculator';

                        if (route.name === 'Calculator') {
                            iconName = focused ? 'calculator' : 'calculator-outline';
                        } 
                        else if (route.name === 'Payment') {
                            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
                        }
                        else if (route.name === 'Cost') {
                            iconName = focused ? 'analytics' : 'analytics-outline';
                        }
                        else if (route.name === 'Payoff') {
                            iconName = focused ? 'cash-sharp' : 'cash-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name='Calculator' component={CalculatorScreen}/>
                <Tab.Screen 
                    name='Payment' 
                    component={PaymentScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('Payment', { id: 'payment' });
                            if (isLoaded) show();
                        }
                    })}
                />
                <Tab.Screen name='Cost' component={CostScreen}/>
                <Tab.Screen name='Payoff' component={PayoffScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;