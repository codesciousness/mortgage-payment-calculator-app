import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { Ionicons } from '@expo/vector-icons';
import CalculatorScreen from './CalculatorScreen';
import PaymentScreen from './PaymentScreen';
import CostScreen from './CostScreen';
import PayoffScreen from './PayoffScreen';

const Tab = createBottomTabNavigator();

//const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7298976665565402~8630267393';

const AppNavigator = (): JSX.Element => {
    const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['mortgage loan', 'real estate']
    });
    const nav = useNavigation();

    const displayAd = () => {
        if (isLoaded) show();
        else nav.navigate('Payment', { id: 'payment' });
    };

    useEffect(() => {
        load();
    }, [load]);
    
    useEffect(() => {
        if (isClosed) {
            nav.navigate('Payment', { id: 'payment' });
        }
    }, [isClosed, nav]);

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
                    listeners={{tabPress: (e) => {
                        e.preventDefault();
                        displayAd();
                    }}}
                />
                <Tab.Screen name='Cost' component={CostScreen}/>
                <Tab.Screen name='Payoff' component={PayoffScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;