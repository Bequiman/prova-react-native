import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Button,
    Pressable,
} from 'react-native';

export default function Home({ navigation }) {
    return (
        <View>
            <Pressable
                onPress={() => navigation.navigate('Participante')}
                style={{
                    backgroundColor: 'plum',
                    padding: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    width: 120,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto'}}>Participante</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Item')}
                style={{
                    backgroundColor: 'plum',
                    padding: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    width: 120,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto'}}>Item</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Lance')}
                style={{
                    backgroundColor: 'plum',
                    padding: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    width: 120,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto'}}>Lance</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Encerrar')}
                style={{
                    backgroundColor: 'plum',
                    padding: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    width: 120,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto'}}>Encerrar</Text>
            </Pressable>
        </View>
    );
}





{/* <Button style={{
    backgroundColor: 'plum',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
}} title="Participante" onPress={() => navigation.navigate('Participante')}>
    

</Button> */}