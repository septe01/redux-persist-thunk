import * as React from 'react'
import { View, Switch, Text } from 'react-native'
import { useTheme } from '@react-navigation/native';


const SettingScreen = ({ setDark, darkTheme }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}>
                <Text style={{ color: colors.text}}>DARK MODE</Text>
                <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={darkTheme ? "#00E4E4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => setDark(value)}
                value={darkTheme}
            />
            </View>
        </View>
    );
}

export default SettingScreen