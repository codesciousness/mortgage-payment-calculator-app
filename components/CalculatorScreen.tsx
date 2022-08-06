import React from 'react';
import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    ScrollView,
    Slider,
    Text,
    useColorMode,
    VStack
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ToggleDarkMode from './ToggleDarkMode';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CalculatorScreen = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    const iconColor = colorMode === 'light' ? 'black' : 'white';
    const nav = useNavigation();

    return (
        <ScrollView px={3} _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }}>
            <ToggleDarkMode/>
            <VStack space={2} w='95%' m='auto'>
                <Box py={4} rounded='2xl' shadow={3} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'white' }}>
                    <Center>
                        <Text mb={2} textAlign='center'>Monthly payment</Text>
                        <Heading mb={2} size='xl' textAlign='center'>$2,328</Heading>
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
                    <Input w='93%' placeholder='350,000'/>
                </InputGroup>
                <HStack justifyContent='space-between'><Text>Down payment</Text><Text bold>$35,000</Text></HStack>
                <Slider w='100%' defaultValue={10} minValue={0} maxValue={100} step={1} colorScheme='emerald' accessibilityLabel='Down payment'>
                    <Slider.Track>
                        <Slider.FilledTrack bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}/>
                    </Slider.Track>
                    <Slider.Thumb bg='deepskyblue'/>
                </Slider>
                <HStack justifyContent='space-between'><Text>Interest rate</Text><Text bold>5.75%</Text></HStack>
                <Slider w='100%' defaultValue={5.75} minValue={0} maxValue={25} step={0.25} accessibilityLabel='Interest rate'>
                    <Slider.Track>
                        <Slider.FilledTrack bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}/>
                    </Slider.Track>
                    <Slider.Thumb bg='deepskyblue'/>
                </Slider>
                <HStack justifyContent='space-between'><Text>Loan term</Text><Text bold>30 Year(s)</Text></HStack>
                <Slider w='100%' defaultValue={30} minValue={1} maxValue={50} step={1} accessibilityLabel='Loan term'>
                    <Slider.Track>
                        <Slider.FilledTrack bg={{ linearGradient: {colors: ['paleturquoise', 'deepskyblue'], start: [0, 0], end: [1, 0]}}}/>
                    </Slider.Track>
                    <Slider.Thumb bg='deepskyblue'/>
                </Slider>
                <Text>Start date</Text>
                <Input w='100%' mr={4} placeholder='08/2022' InputRightElement={<MaterialCommunityIcons name='calendar' size={30} color={iconColor}/>}/>
                <Text>Monthly property tax</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='315'/>
                </InputGroup>
                <Text>Monthly home insurance</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='175'/>
                </InputGroup>
                <Text>Monthly PMI</Text>
                <InputGroup w='100%'>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='0'/>
                </InputGroup>
                <Text>Monthly HOA fees</Text>
                <InputGroup w='100%' mb={4}>
                    <InputLeftAddon w='7%' children={'$'}/>
                    <Input w='93%' placeholder='0'/>
                </InputGroup>
            </VStack>
        </ScrollView>
    );
};

export default CalculatorScreen;