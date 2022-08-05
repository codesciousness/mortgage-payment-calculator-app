import React from 'react';
import { Text, HStack, Switch, useColorMode } from 'native-base';

const ToggleDarkMode = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <HStack mr={2} space={1} alignItems='center' alignSelf='flex-end'>
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === 'light'}
                onToggle={toggleColorMode}
                aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
                offTrackColor='blueGray.500'
                onTrackColor='lightBlue.200'
                onThumbColor='deepskyblue'
                offThumbColor='blueGray.50'
            />
            <Text>Light</Text>
        </HStack>
    );
};

export default ToggleDarkMode;