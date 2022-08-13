import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Center, CloseIcon, Collapse, HStack, IconButton, Input, Modal, Text, 
    useColorMode, VStack } from 'native-base';
import { selectHomePrice, selectDownPayment, selectLoanTerm, selectInterestRate, selectPropertyTax, 
    selectHomeInsurance, selectPMI, selectHOAFees, selectStartDate, selectMortgagePayment, 
    selectMonthlyPayment, selectLoanAmount, selectTotalInterest, selectLoanCost, selectPayoffDate, 
    selectAmortizationSchedule } from '../loansSlice';
import { useAppSelector } from '../app/hooks';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EmailModal = (): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
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
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);
    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = colorMode === 'light' ? '#0f172a' : 'white';

    const status = [
        {
            status: undefined, 
            msg: ''
        },
        {
            status: 'error',
            msg: 'Please provide a name and email address.'
        },
        {
            status: 'error',
            msg: 'Submission error. Please try again.'
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
        payoffDate,
        amortizationSchedule
    };

    const handleNameChange = (value: string) => setName(value);
    const handleEmailChange = (value: string) => setEmail(value);
    const handlePress = async() => {
        if (!name || !email) {
            setAlert(status[1]);
            setError(true);
            return;
        };
        let newLoan;
        const Loans = collection(db, 'loans');
        try {
            newLoan = await addDoc(Loans, loan);
        }
        catch(err) {
            setAlert(status[2]);
            setError(true);
            return;
        };
        if (newLoan) {
            setError(false);
            setAlert(status[3]);
            setSuccess(true);
        };
    };

    const clear = () => {
        setName('');
        setEmail('');
        setError(false);
        setSuccess(false);
        setAlert(status[0]);
    };

    useEffect(() => {
        clear();
    }, [showModal]);

    return (
        <Center>
            <Button p={2.5} size='md' _text={{color: textColor}} bg='lightBlue.300' onPress={() => setShowModal(true)}>EMAIL RESULTS</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxW='400px'>
                    <Modal.CloseButton/>
                    <Modal.Header>Email your loan summary!</Modal.Header>
                    <Modal.Body>
                        <Collapse isOpen={success || error}>
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
                        <VStack my={2} space={[4, 4, 6]}>
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
                            <Button px={4} _text={{color: textColor}} bg='lightBlue.300' onPress={handlePress}>
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