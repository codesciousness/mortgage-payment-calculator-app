import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Heading, ScrollView, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { useResponsiveScreenWidth } from 'react-native-responsive-dimensions';
import ToggleDarkMode from './ToggleDarkMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectAmortizationSchedule, AmortizationDetail } from '../loansSlice';
import { useAppSelector } from '../app/hooks';

const PayoffScreen = (): JSX.Element => {
    const amortizationSchedule = useAppSelector(selectAmortizationSchedule);
    const data = amortizationSchedule.map((row: AmortizationDetail) => ({ date: row.date, principal: row.principal, interest: row.interest, remainingBalance: row.remainingBalance }));
    const screenWidth = useResponsiveScreenWidth(100);
    const flexI = screenWidth < 500 ? 0.8 : 0.9;
    const flexB = screenWidth < 500 ? 1.25 : 1.10;
    const numberOfItemsPerPageList = [10, 25, 50];
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const nav = useNavigation();

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <ScrollView px={2} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <VStack my={[1, 1, 4]}>
                <Heading mb={[0, 1, 2]} textAlign='center'>Amortization Schedule</Heading>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{flex: 0}}><Text>Date</Text></DataTable.Title>
                        <DataTable.Title numeric><Text>Principal</Text></DataTable.Title>
                        <DataTable.Title style={{flex: flexI}} numeric><Text>Interest</Text></DataTable.Title>
                        <DataTable.Title numeric><Text>Balance</Text></DataTable.Title>
                    </DataTable.Header>

                    {data.length && data.slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage).map((row, idx) => 
                        <DataTable.Row key={idx}>
                            <DataTable.Cell style={{flex: 0}}><Text>{row.date}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text>${row.principal}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text>${row.interest}</Text></DataTable.Cell>
                            <DataTable.Cell style={{flex: flexB}} numeric><Text>${row.remainingBalance}</Text></DataTable.Cell>
                        </DataTable.Row>
                    )}

                    <DataTable.Pagination
                        page={page}
                        label={`${from + 1}-${to} of ${data.length}`}
                        numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={numberOfItemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable>
            </VStack>
            <Center>
                <Box w='auto' rounded='sm' mb={4} bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}>
                    <Button
                        size='md'
                        variant='outline'
                        _text={{color: 'blueGray.900'}}
                        onPress={() => nav.navigate('Calculator', { id: 'calculator' })}
                        leftIcon={<MaterialCommunityIcons name="arrow-left-drop-circle-outline" size={24} color='#0f172a'/>}
                    >
                        BACK TO CALCULATOR
                    </Button>
                </Box>
            </Center>
        </ScrollView>
    );
};

export default PayoffScreen;