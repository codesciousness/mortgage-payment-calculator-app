import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import PaymentScreen from './PaymentScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = (): JSX.Element => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: 'calculator' | 'calculator-outline' | 'pie-chart' | 'pie-chart-outline' | 'analytics' | 'analytics-outline' | 'cash-sharp' | 'cash-outline' = 'calculator';

                        if (route.name === 'Home') {
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
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Payment" component={PaymentScreen}/>
                <Tab.Screen name="Cost" component={HomeScreen}/>
                <Tab.Screen name="Payoff" component={HomeScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;