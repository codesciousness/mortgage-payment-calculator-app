import React from 'react';
import { HStack, Switch, useColorMode } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ToggleDarkMode = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    const iconColor = colorMode === 'light' ? 'black' : 'white';

    return (
        <HStack my={1} mr={2} space={1} alignItems='center' alignSelf='flex-end'>
            <Switch
                isChecked={colorMode === 'light'}
                onToggle={toggleColorMode}
                aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
                offTrackColor='blueGray.500'
                onTrackColor='lightBlue.200'
                onThumbColor='deepskyblue'
                offThumbColor='blueGray.50'
            />
            {colorMode === 'light' ? <Fontisto name='day-sunny' size={24} color={iconColor}/> : <Ionicons name='moon-outline' size={24} color={iconColor}/>}
        </HStack>
    );
};

export default ToggleDarkMode;