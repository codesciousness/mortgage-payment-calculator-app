import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Heading, HStack, ScrollView, Text, useColorMode,
    View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-gifted-charts';
import { useResponsiveScreenHeight, useResponsiveScreenWidth } from 'react-native-responsive-dimensions';
import ToggleDarkMode from './ToggleDarkMode';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectLoanAmount, selectTotalInterest, selectLoanCost, selectPayoffDate, 
    selectAmortizationSchedule, AmortizationDetail } from '../loansSlice';
import { useAppSelector } from '../app/hooks';
import { stringToNum, formatAmount, formatDate, formatCash } from '../util/calculations';

interface DataPoint {
    label: string;
    value: number;
    labelComponent: () => JSX.Element;
};

const CostScreen = (): JSX.Element => {
    const loanAmount = useAppSelector(selectLoanAmount);
    const totalInterest = useAppSelector(selectTotalInterest);
    const loanCost = useAppSelector(selectLoanCost);
    const payoffDate = useAppSelector(selectPayoffDate);
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);
    const screenHeight = useResponsiveScreenHeight(25);
    const screenWidth = useResponsiveScreenWidth(90);
    const { colorMode, toggleColorMode } = useColorMode();
    const borderBottomColor = colorMode === 'light' ? 'blueGray.200' : 'blueGray.700';
    const textColor = colorMode === 'light' ? '#0f172a' : 'white';
    const iconColor = colorMode === 'light' ? 'black' : 'white';
    const nav = useNavigation();

    const customLabel = (value: string) => <Text w={10} textAlign='center'>{value.slice(3)}</Text>;
    const data: DataPoint[] = amortizationSchedule.map((row: AmortizationDetail, idx: number) => {
        let dataPoint: DataPoint;
        if (idx === 0 || idx % 120 === 0) {
            dataPoint = { label: formatDate(row.date), value: stringToNum(row.totalPrincipal), labelComponent: () => customLabel(row.date) };
        }
        else {
            dataPoint = { label: formatDate(row.date), value: stringToNum(row.totalPrincipal), labelComponent: () => customLabel('') };
        }
        return dataPoint;
    });
    const data2: DataPoint[] = amortizationSchedule.map((row: AmortizationDetail) => ({ label: formatDate(row.date), value: stringToNum(row.totalInterest), labelComponent: () => customLabel('') }));
    const data3: DataPoint[] = amortizationSchedule.map((row: AmortizationDetail) => ({ label: formatDate(row.date), value: stringToNum(row.remainingBalance), labelComponent: () => customLabel('') }));

    const [ principalPaid, setPrincipalPaid ] = useState(formatAmount(data[0].value));
    const [ interestPaid, setInterestPaid ] = useState(formatAmount(data2[0].value));
    const [ loanBalance, setLoanBalance ] = useState(formatAmount(data3[0].value));

    const maxValue = (value1: number, value2: number) => value1 > value2 ? value1 : value2;

    const YAxisText = (num: number): string[] => [formatCash(0), formatCash(num * 0.25), formatCash(num/2), formatCash(num * 0.75), formatCash(num)];

    useEffect(() => {
        setPrincipalPaid(formatAmount(data[0].value));
        setInterestPaid(formatAmount(data2[0].value));
        setLoanBalance(formatAmount(data3[0].value));
    }, [amortizationSchedule]);

    return (
        <ScrollView px={[1, 1, 2]} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <Center>
                <Heading>Mortgage Loan Cost</Heading>
                <Box w='100%' mt={2} mb={[4, 6, 10]} mx='auto'>
                    <LineChart
                        data={data}
                        data2={data2} 
                        data3={data3}
                        maxValue={maxValue(data[0].value + data3[0].value, data2[data2.length-1].value)}
                        noOfSections={4}
                        width={screenWidth}
                        height={screenHeight}
                        adjustToWidth
                        initialSpacing={1}
                        color1='steelblue'
                        color2='deepskyblue'
                        color3='powderblue'
                        yAxisColor='#cbd5e1'
                        xAxisColor='#cbd5e1'
                        yAxisLabelTexts={YAxisText(maxValue(data[0].value + data3[0].value, data2[data2.length-1].value))}
                        yAxisTextStyle={{color: textColor}}
                        yAxisLabelWidth={60}
                        hideDataPoints
                        thickness={4}
                        rulesColor='#cbd5e1'
                        rulesType='solid'
                        yAxisLabelPrefix='$'
                        isAnimated
                        animationDuration={600}
                        pointerConfig={{
                            pointerStripColor: textColor,
                            pointerStripWidth: 3,
                            pointerColor: textColor,
                            radius: 4,
                            pointerLabelWidth: 100,
                            pointerLabelHeight: 90,
                            pointerLabelComponent: (items: any) => {
                                setPrincipalPaid(formatAmount(items[0].value));
                                setInterestPaid(formatAmount(items[1].value));
                                setLoanBalance(formatAmount(items[2].value));
                                return (
                                    <View p={2} shadow={3} rounded='md' justifyContent='center' _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                                        <Text textAlign='center'>
                                            {items[0].label}
                                        </Text>
                                    </View>
                                );
                            }
                        }}
                    />
                </Box>
            </Center>
            <VStack px={[2, 2, 4]}>
                <HStack w='100%' px={2} py={[4, 4, 6]} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='steelblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Principal paid</Text>
                    </HStack>
                    <Text>${principalPaid}</Text>
                </HStack>
                <HStack w='100%' px={2} py={[4, 4, 6]} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='deepskyblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Interest paid</Text>
                    </HStack>
                    <Text>${interestPaid}</Text>
                </HStack>
                <HStack w='100%' px={2} py={[4, 4, 6]} borderBottomWidth={1} borderBottomColor={borderBottomColor} justifyContent='space-between' alignItems='center'>
                    <HStack alignItems='center'>
                        <Box bg='powderblue' w={4} h={4} borderRadius={50} mr={2}></Box>
                        <Text>Loan balance</Text>
                    </HStack>
                    <Text>${loanBalance}</Text>
                </HStack>
            </VStack>
            <HStack my={[4, 4, 6]} mx='auto' justifyContent='center' alignItems='center' flexWrap='wrap' w='100%'>
                <Box m={1} w={['45%', '45%', '24%']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                        <Center mb={2}><FontAwesome5 name='hand-holding-usd' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>${loanAmount}</Heading>
                        <Text textAlign='center'>Loan amount</Text>
                    </VStack>
                </Box>
                <Box m={1} w={['45%', '45%', '24%']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                    <Center mb={2}><MaterialCommunityIcons name='trending-up' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>${totalInterest}</Heading>
                        <Text textAlign='center'>Total interest paid</Text>
                    </VStack>
                </Box>
                <Box m={1} w={['45%', '45%', '24%']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                    <Center mb={2}><MaterialCommunityIcons name='cash-multiple' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>${loanCost}</Heading>
                        <Text textAlign='center'>Total cost of loan</Text>
                    </VStack>
                </Box>
                <Box m={1} w={['45%', '45%', '24%']} rounded='xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <VStack p={3}>
                        <Center mb={2}><MaterialCommunityIcons name='calendar-check' size={32} color={iconColor}/></Center>
                        <Heading textAlign='center'>{payoffDate}</Heading>
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
                    onPress={() => nav.navigate('Payoff', { id: 'payoff' })}
                    endIcon={<MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={24} color={textColor}/>}
                >
                    SEE PAYOFF
                </Button>
            </Center>
        </ScrollView>
    );
};

export default CostScreen;