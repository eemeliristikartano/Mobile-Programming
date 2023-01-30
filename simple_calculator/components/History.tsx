import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View } from 'react-native';
import { styles } from '../Styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamsList, THistory } from '../types';

type Props = NativeStackScreenProps<StackParamsList, 'History'>

export default function History({ route, navigation }: Props) {
    const history: readonly THistory[] = route.params;
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25 }} >History</Text>
            <FlatList
                data={history}
                renderItem={({ item, index }) => <Text style={{ fontSize: 20 }} >{`${index + 1}.    ${item.numA} ${item.operation} ${item.numB} = ${item.result}`}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <StatusBar style="auto" />
        </View>
    )
}