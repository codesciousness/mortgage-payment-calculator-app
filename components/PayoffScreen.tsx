import React, { useState, useEffect } from 'react';
import {
    Button,
    Center,
    Heading,
    ScrollView,
    Text,
    useColorMode,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import ToggleDarkMode from './ToggleDarkMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data=[
    { date: '08/2022', principal: '328.88', interest: '1,509.38', remainingBalance: '314,671.12' },
    { date: '09/2022', principal: '330.46', interest: '1,507.80', remainingBalance: '314,340.67' },
    { date: '10/2022', principal: '332.04', interest: '1,506.22', remainingBalance: '314,008.63' },
    { date: '11/2022', principal: '333.63', interest: '1,504.62', remainingBalance: '313,675.00' },
    { date: '12/2022', principal: '335.23', interest: '1,503.03', remainingBalance: '313,339.77' }
];

const PayoffScreen = (): JSX.Element => {
    const numberOfItemsPerPageList = [10, 25, 50];
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = colorMode === 'light' ? '#0f172a' : 'white';
    const nav = useNavigation();

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <ScrollView px={3} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <Center>
                <Heading>Amortization Schedule</Heading>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title><Text>Date</Text></DataTable.Title>
                        <DataTable.Title numeric><Text>Principal</Text></DataTable.Title>
                        <DataTable.Title numeric><Text>Interest</Text></DataTable.Title>
                        <DataTable.Title numeric><Text>Balance</Text></DataTable.Title>
                    </DataTable.Header>

                    {data.map((row, idx) => 
                        <DataTable.Row key={idx}>
                            <DataTable.Cell><Text>{row.date}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text>${row.principal}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text>${row.interest}</Text></DataTable.Cell>
                            <DataTable.Cell numeric><Text>${row.remainingBalance}</Text></DataTable.Cell>
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
            </Center>
            <Center>
                <Button
                    mt={4}
                    size='md'
                    variant='outline'
                    _text={{color: textColor}}
                    onPress={() => nav.navigate('Calculator')}
                    leftIcon={<MaterialCommunityIcons name="arrow-left-drop-circle-outline" size={24} color={textColor}/>}
                >
                    BACK TO CALCULATOR
                </Button>
            </Center>
        </ScrollView>
    );
};

export default PayoffScreen;