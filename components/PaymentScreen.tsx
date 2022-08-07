import React from 'react';
import { Box, Button, Center, Heading, HStack, ScrollView, Text,
    useColorMode, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-gifted-charts';
import ToggleDarkMode from './ToggleDarkMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectPropertyTax, selectHomeInsurance, selectPMI, selectHOAFees, 
    selectMortgagePayment, selectMonthlyPayment } from '../loansSlice';
import { useAppSelector } from '../app/hooks';
import { stringToNum, formatAmount } from '../util/calculations';

const PaymentScreen = (): JSX.Element => {
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const mortgagePayment = useAppSelector(selectMortgagePayment);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);
    const { colorMode, toggleColorMode } = useColorMode();
    const innerCircleColor = colorMode === 'light' ? '#f8fafc' : '#0f172a';
    const borderBottomColor = colorMode === 'light' ? 'blueGray.200' : 'blueGray.700';
    const textColor = colorMode === 'light' ? '#0f172a' : 'white';
    const nav = useNavigation();

    const data=[
        { value: stringToNum(mortgagePayment), color: 'deepskyblue' },
        { value: stringToNum(propertyTax), color: 'lightskyblue' },
        { value: stringToNum(homeInsurance), color: 'lightsteelblue' },
        { value: stringToNum(privateMortgageInsurance), color: 'powderblue' },
        { value: stringToNum(hoaFees), color: 'paleturquoise' }
    ];

    return (
        <ScrollView px={3} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <Center position='relative'>
                <Box w={240} h={240}>
                    <PieChart data={data} donut innerRadius={110} innerCircleColor={innerCircleColor}/>
                </Box>
                <Center position='absolute'>
                    <VStack space={2}>
                        <Text textAlign='center'>Monthly payment</Text>
                        <Heading size='xl' textAlign='center'>${monthlyPayment}</Heading>
                    </VStack>
                </Center>
            </Center>
            <VStack px={2} my={4}>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='deepskyblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Principal &amp; interest</Text>
                    </HStack>
                    <Text>${formatAmount(mortgagePayment)}</Text>
                </HStack>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='lightskyblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Property tax</Text>
                    </HStack>
                    <Text>${propertyTax}</Text>
                </HStack>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='lightsteelblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Home insurance</Text>
                    </HStack>
                    <Text>${homeInsurance}</Text>
                </HStack>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='powderblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Private mortgage insurance</Text>
                    </HStack>
                    <Text>${privateMortgageInsurance}</Text>
                </HStack>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='paleturquoise' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>HOA fees</Text>
                    </HStack>
                    <Text>${hoaFees}</Text>
                </HStack>
            </VStack>
            <Center>
                <Button
                    mt={4}
                    size='md'
                    variant='outline'
                    _text={{color: textColor}}
                    onPress={() => nav.navigate('Cost')}
                    endIcon={<MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={24} color={textColor}/>}
                >
                    SEE COST
                </Button>
            </Center>
        </ScrollView>
    );
};

export default PaymentScreen;