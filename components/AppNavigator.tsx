import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import mobileAds from 'react-native-google-mobile-ads';
import { Ionicons } from '@expo/vector-icons';
import CalculatorScreen from './CalculatorScreen';
import PaymentScreen from './PaymentScreen';
import CostScreen from './CostScreen';
import PayoffScreen from './PayoffScreen';

const Tab = createBottomTabNavigator();

mobileAds().initialize()

const AppNavigator = (): JSX.Element => {

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
                <Tab.Screen name='Payment' component={PaymentScreen}/>
                <Tab.Screen name='Cost' component={CostScreen}/>
                <Tab.Screen name='Payoff' component={PayoffScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;