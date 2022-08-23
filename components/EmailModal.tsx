import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Center, CloseIcon, Collapse, HStack, IconButton, Input, Modal, Text, 
    useColorMode, VStack } from 'native-base';
import { selectHomePrice, selectDownPayment, selectLoanTerm, selectInterestRate, selectPropertyTax, 
    selectHomeInsurance, selectPMI, selectHOAFees, selectStartDate, selectMortgagePayment, 
    selectMonthlyPayment, selectLoanAmount, selectTotalInterest, selectLoanCost, selectPayoffDate, 
    saveLoan, selectSavingLoan, selectSaveLoanSuccess, selectSaveLoanError, clearStatusUpdates 
    } from '../loansSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const EmailModal = (): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const homePrice = useAppSelector(selectHomePrice);
    const downPayment = useAppSelector(selectDownPayment);
    const loanTerm = useAppSelector(selectLoanTerm);
    const interestRate = useAppSelector(selectInterestRate);
    const startDate = useAppSelector(selectStartDate);
    const propertyTax = useAppSelector(selectPropertyTax);
    const homeInsurance = useAppSelector(selectHomeInsurance);
    const privateMortgageInsurance = useAppSelector(selectPMI);
    const hoaFees = useAppSelector(selectHOAFees);
    const mortgagePayment = useAppSelector(selectMortgagePayment);
    const monthlyPayment = useAppSelector(selectMonthlyPayment);
    const loanAmount = useAppSelector(selectLoanAmount);
    const loanCost = useAppSelector(selectLoanCost);
    const totalInterest = useAppSelector(selectTotalInterest);
    const payoffDate = useAppSelector(selectPayoffDate);
    const savingLoan = useAppSelector(selectSavingLoan);
    const saveLoanSuccess = useAppSelector(selectSaveLoanSuccess);
    const saveLoanError = useAppSelector(selectSaveLoanError);
    const dispatch = useAppDispatch();
    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = colorMode === 'light' ? '#0f172a' : 'white';

    const status = [
        {
            status: undefined, 
            msg: ''
        },
        {
            status: 'error',
            msg: saveLoanError
        },
        {
            status: 'success',
            msg: 'Loan data submitted successfully!'
        }
    ];
    const [alert, setAlert] = useState(status[0]);

    const loan = {
        name,
        email,
        homePrice,
        downPayment,
        loanTerm,
        interestRate,
        startDate,
        propertyTax,
        homeInsurance,
        privateMortgageInsurance,
        hoaFees,
        mortgagePayment,
        monthlyPayment,
        loanAmount,
        loanCost,
        totalInterest,
        payoffDate
    };

    const submitSuccess = () => {
        setAlert(status[2]);
        setName('');
        setEmail('');
    };

    const submitFail = () => {
        setAlert(status[1]);
    };

    const clear = () => {
        dispatch(clearStatusUpdates());
        setAlert(status[0]);
    };

    const handleNameChange = (value: string) => setName(value);
    const handleEmailChange = (value: string) => setEmail(value.trim());
    const handlePress = () => dispatch(saveLoan(loan));

    useEffect(() => {
        setName('');
        setEmail('');
        clear();
    }, [showModal]);

    useEffect(() => {
        if (saveLoanError) submitFail();
        if (saveLoanSuccess) submitSuccess();
    }, [saveLoanError, saveLoanSuccess]);

    return (
        <Center>
            <Button p={2.5} size='md' _text={{color: textColor}} bg='lightBlue.300' onPress={() => setShowModal(true)}>EMAIL RESULTS</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxW='400px'>
                    <Modal.CloseButton/>
                    <Modal.Header>Email your loan summary!</Modal.Header>
                    <Modal.Body mb={2}>
                        <Collapse isOpen={saveLoanSuccess || saveLoanError} my={1}>
                            <Alert w='100%' status={alert.status}>
                                <VStack space={2} flexShrink={1} w='100%'>
                                    <HStack flexShrink={1} space={2} justifyContent='space-between'>
                                        <HStack space={2} flexShrink={1}>
                                            <Alert.Icon mt={1} />
                                            <Text fontSize='md' color='coolGray.800'>
                                                {alert.msg}
                                            </Text>
                                        </HStack>
                                        <IconButton variant='unstyled' _focus={{ borderWidth: 0 }} icon={<CloseIcon size={3} color='coolGray.600' />} onPress={() => clear()}/>
                                    </HStack>
                                </VStack>
                            </Alert>
                        </Collapse>
                        <VStack my={1} space={4}>
                            <Box>
                                <Text mb={1}>Name</Text>
                                <Input placeholder='Name' value={name} onChangeText={handleNameChange}/>
                            </Box>
                            <Box>
                                <Text mb={1}>Email</Text>
                                <Input placeholder='Email' value={email} onChangeText={handleEmailChange}/>
                            </Box>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant='ghost' colorScheme='blueGray' onPress={() => setShowModal(false)}>
                                CANCEL
                            </Button>
                            <Button
                                px={4}
                                _text={{color: textColor}}
                                bg='lightBlue.300'
                                onPress={handlePress}
                                isLoading={savingLoan}
                                spinnerPlacement='end'
                                isLoadingText='SENDING'
                            >
                                SEND
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    );
};

export default EmailModal;