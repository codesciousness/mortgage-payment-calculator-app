import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    ScrollView,
    Text,
    useColorMode,
    View,
    VStack
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-gifted-charts';
import ToggleDarkMode from './ToggleDarkMode';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CostScreen = (): JSX.Element => {
    const customLabel = (val: string) => <Text fontWeight='bold'>{val.slice(3)}</Text>;

    const data=[
        { value: 328.88, date: '08/2022' },
        { value: 330.46, date: '09/2022' },
        { value: 332.04, date: '10/2022' },
        { value: 333.63, date: '11/2022' },
        { value: 335.23, date: '12/2022', labelComponent: () => customLabel('12/2022'), }
    ];

    const data2=[
        { value: 1509.38, date: '08/2022' },
        { value: 1507.80, date: '09/2022' },
        { value: 1506.22, date: '10/2022' },
        { value: 1504.62, date: '11/2022' },
        { value: 1503.03, date: '12/2022' }
    ];

    const data3=[
        { value: 314671.12, date: '08/2022' },
        { value: 314340.67, date: '09/2022' },
        { value: 314008.63, date: '10/2022' },
        { value: 313675.00, date: '11/2022' },
        { value: 313339.77, date: '12/2022' }
    ];

    const [ principalPaid, setPrincipalPaid ] = useState(data[0].value);
    const [ interestPaid, setInterestPaid ] = useState(data2[0].value);
    const [ loanBalance, setLoanBalance ] = useState(data3[0].value);
    const { colorMode, toggleColorMode } = useColorMode();
    const borderBottomColor = colorMode === 'light' ? 'blueGray.200' : 'blueGray.700';
    const textColor = colorMode === 'light' ? '#0f172a' : 'white';
    const iconColor = colorMode === 'light' ? 'black' : 'white';
    const nav = useNavigation();

    return (
        <ScrollView px={2} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <Center>
                <Heading>Mortgage Loan Cost</Heading>
                <Box w='100%' h={240} my={1} mx='auto'>
                    <LineChart
                        data={data}
                        data2={data2} 
                        data3={data3}
                        maxValue={data3[data3.length - 1].value}
                        curved
                        initialSpacing={0}
                        color1='deepskyblue'
                        color2='lightskyblue'
                        color3='lightsteelblue'
                        yAxisColor='#cbd5e1'
                        xAxisColor='#cbd5e1'
                        yAxisTextStyle={{color: textColor}}
                        hideDataPoints
                        hideRules
                        //hideYAxisText
                        thickness={4}
                        rulesType='solid'
                        yAxisLabelPrefix='$'
                        yAxisLabelSuffix='K'
                        isAnimated
                        animateOnDataChange
                        animationDuration={1000}
                        onDataChangeAnimationDuration={300}
                        pointerConfig={{
                            pointerStripColor: '#cbd5e1',
                            pointerStripWidth: 3,
                            pointerColor: '#cbd5e1',
                            radius: 4,
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 90,
                            pointerLabelComponent: (items: any) => {
                                setPrincipalPaid(items[0].value);
                                setInterestPaid(items[1].value);
                                setLoanBalance(items[2].value);
                                return (
                                    <View p={2} shadow={3} rounded='md' justifyContent='center' _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                                        <Text textAlign='center'>
                                            {items[0].date}
                                        </Text>
                                    </View>
                                );
                            }
                        }}
                    />
                </Box>
            </Center>
            <VStack px={2}>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='deepskyblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Principal paid</Text>
                    </HStack>
                    <Text>${principalPaid}</Text>
                </HStack>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='lightskyblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Interest paid</Text>
                    </HStack>
                    <Text>${interestPaid}</Text>
                </HStack>
                <HStack w='100%' px={2} py={4} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='lightsteelblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Loan balance</Text>
                    </HStack>
                    <Text>${loanBalance}</Text>
                </HStack>
            </VStack>
            <HStack py={2} my={2} mx='auto' justifyContent='center' alignItems='center' flexWrap='wrap' w={['100%', '100%', '75%']} maxW={800}>
                <Box m={1} w={['45%', '45%', '150']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                        <Center mb={2}><FontAwesome5 name='hand-holding-usd' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>$315,000</Heading>
                        <Text textAlign='center'>Loan amount</Text>
                    </VStack>
                </Box>
                <Box m={1} w={['45%', '45%', '150']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                    <Center mb={2}><MaterialCommunityIcons name='trending-up' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>$346,772</Heading>
                        <Text textAlign='center'>Total interest paid</Text>
                    </VStack>
                </Box>
                <Box m={1} w={['45%', '45%', '150']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                    <Center mb={2}><MaterialCommunityIcons name='cash-multiple' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>$661,772</Heading>
                        <Text textAlign='center'>Total cost of loan</Text>
                    </VStack>
                </Box>
                <Box m={1} w={['45%', '45%', '150']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                        <Center mb={2}><MaterialCommunityIcons name='calendar-check' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>08/2052</Heading>
                        <Text textAlign='center'>Payoff date</Text>
                    </VStack>
                </Box>
            </HStack>
            <Center>
                <Button
                    mb={4}
                    size='md'
                    variant='outline'
                    _text={{color: textColor}}
                    onPress={() => nav.navigate('Payoff')}
                    endIcon={<MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={24} color={textColor}/>}
                >
                    SEE PAYOFF
                </Button>
            </Center>
        </ScrollView>
    );
};

export default CostScreen;