import React from 'react';
import { Box, Button, Center, Heading, HStack, Input, InputGroup, InputLeftAddon, ScrollView,
    Slider, Text, useColorMode, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ToggleDarkMode from './ToggleDarkMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectHomePrice, selectDownPayment, selectLoanTerm, selectInterestRate, selectPropertyTax, 
    selectHomeInsurance, selectPMI, selectHOAFees, selectStartDate, selectMonthlyPayment, 
    setHomePrice, setDownPayment, setLoanTerm, setInterestRate, setPropertyTax, setHomeInsurance, 
    setPMI, setHOAFees, setStartDate } from '../loansSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fromPercent } from '../util/calculations';

const CalculatorScreen = (): JSX.Element => {
    const homePrice = useAppSelector(selectHomePrice);
    const downPayment = useAppSelector(selectDownPayment);
    const loanTerm = useAppSelector(selectLoanTerm);
    const interestRate = useAppSelector(selectInterestRate);
    const startDate = useAppSelector(selectStartDate);
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);
    const dispatch = useAppDispatch();
    const { colorMode, toggleColorMode } = useColorMode();
    const iconColor = colorMode === 'light' ? 'black' : 'white';
    const nav = useNavigation();

    const allNums = (value: string) => {
        return value.split('').filter(char => char !== '.' && char !== ',').map(char => parseFloat(char)).every(char => !isNaN(char));
    };

    const handleHomePriceChange = (value: string) => {
        if (allNums(value)) dispatch(setHomePrice(value));
    };

    const handleDownPaymentChange = (value: number) => {
        const downPayment = fromPercent(value/100, homePrice);
        dispatch(setDownPayment(downPayment));
    };

    const handleInterestRateChange = (value: number) => dispatch(setInterestRate(value));

    const handleLoanTermChange = (value: number) => dispatch(setLoanTerm(value));

    const handleStartDateChange = (value: string) => {
        dispatch(setStartDate(value));
    };

    const handlePropertyTaxChange = (value: string) => {
        if (allNums(value)) dispatch(setPropertyTax(value));
    };

    const handleHomeInsuranceChange = (value: string) => {
        if (allNums(value)) dispatch(setHomeInsurance(value));
    };

    const handlePMIChange = (value: string) => {
        if (allNums(value)) dispatch(setPMI(value));
    };

    const handleHOAFeesChange = (value: string) => {
        if (allNums(value)) dispatch(setHOAFees(value));
    };

    return (
        <ScrollView px={3} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <VStack space={2} w='95%' m='auto'>
                <Box py={4} rounded='2xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <Center>
                        <Text mb={2} textAlign='center'>Monthly payment</Text>
                        <Heading mb={2} size='xl' textAlign='center'>${monthlyPayment}</Heading>
                        <Box w='auto' rounded='sm' my={2} bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}>
                            <Button 
                                size='md'
                                variant='outline'
                                _text={{color: 'blueGray.900'}}
                                onPress={() => nav.navigate('Payment')}
                                endIcon={<MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={24} color='#0f172a'/>}
                            >
                                SEE DETAILS
                            </Button>
                        </Box>
                    </Center>
                </Box>
                <Text>Home price</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='350,000' value={homePrice} onChangeText={handleHomePriceChange}/>
                </InputGroup>
                <HStack justifyContent='space-between'><Text>Down payment</Text><Text bold>${downPayment}</Text></HStack>
                <Slider w='100%' defaultValue={10} minValue={0} maxValue={100} step={1} accessibilityLabel='Down payment' onChange={handleDownPaymentChange}>
                    <Slider.Track>
                        <Slider.FilledTrack bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}/>
                    </Slider.Track>
                    <Slider.Thumb bg='deepskyblue'/>
                </Slider>
                <HStack justifyContent='space-between'><Text>Interest rate</Text><Text bold>{interestRate}%</Text></HStack>
                <Slider w='100%' defaultValue={5.75} minValue={0} maxValue={25} step={0.25} accessibilityLabel='Interest rate' value={interestRate} onChange={handleInterestRateChange}>
                    <Slider.Track>
                        <Slider.FilledTrack bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}/>
                    </Slider.Track>
                    <Slider.Thumb bg='deepskyblue'/>
                </Slider>
                <HStack justifyContent='space-between'><Text>Loan term</Text><Text bold>{loanTerm} {loanTerm === 1 ? 'Year' : 'Years'}</Text></HStack>
                <Slider w='100%' defaultValue={30} minValue={1} maxValue={50} step={1} accessibilityLabel='Loan term' value={loanTerm} onChange={handleLoanTermChange}>
                    <Slider.Track>
                        <Slider.FilledTrack bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}/>
                    </Slider.Track>
                    <Slider.Thumb bg='deepskyblue'/>
                </Slider>
                <Text>Start date (mm/yyyy)</Text>
                <Input w='100%' mr={4} placeholder='08/2022' InputRightElement={<MaterialCommunityIcons name='calendar' size={30} color={iconColor}/>} value={startDate} onChangeText={handleStartDateChange}/>
                <Text>Monthly property tax</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='315' value={propertyTax} onChangeText={handlePropertyTaxChange}/>
                </InputGroup>
                <Text>Monthly home insurance</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='175' value={homeInsurance} onChangeText={handleHomeInsuranceChange}/>
                </InputGroup>
                <Text>Monthly PMI</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='0' value={privateMortgageInsurance} onChangeText={handlePMIChange}/>
                </InputGroup>
                <Text>Monthly HOA fees</Text>
                <InputGroup w='100%' mb={4}>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='0' value={hoaFees} onChangeText={handleHOAFeesChange}/>
                </InputGroup>
            </VStack>
        </ScrollView>
    );
};

export default CalculatorScreen;