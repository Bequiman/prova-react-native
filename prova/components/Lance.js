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

export default function Lance() {   
    const urlItem = 'https://leilao-rest-api.herokuapp.com/itemdeleilao/';
    const [lances, setLances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idItem, setIdItem] = useState('');
    const [valor, setValor] = useState('');
    const [idArrematante, setIdArrematante] = useState('');


    useEffect(() => {
        fetchItem();
    }, []);
   

    const fetchItem = async () => {
        try {
            const response = await fetch(urlItem);
            const data = await response.json();
            setLances(data);
        } catch (error) {
            console.error('Erro ao ler item do leilão', error);
        } finally {
            setLoading(false);
        }
    };

    const createLance = async () => {
        const response = await fetch(urlItem + idItem);
        const item = await response.json();
        try {         
            if(item.leilaoAberto){
                const response = await fetch(urlItem + idItem , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        valor,
                        arrematante: {
                            id: idArrematante,
                        },
                    }),
                });
                if (response.ok) {  
                    fetchItem();                    
                    setIdItem('');
                    setIdArrematante('');
                    setValor('');                    
                } else {
                    console.error('Erro ao criar lance');
                }

            } else {
                console.error('O leilão está fechado. Você não pode enviar um lance.');
            }
           
        } catch (error) {
            console.error('Erro ao criar lance:', error);
        }
    };


    return (
        <View >
            <Text style={styles.title}>Lances do Leilão</Text>
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <View>    
                     <TextInput
                        placeholder="Id do item"
                        value={idItem}
                        onChangeText={(text) => setIdItem(text)}
                        keyboardType="numeric"
                        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
                    />
                    <TextInput
                        placeholder="Valor lance"
                        value={valor}
                        onChangeText={(text) => setValor(text)}
                        keyboardType="numeric"
                        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
                    />
                    <TextInput
                        placeholder="Id do arrematante"
                        value={idArrematante}
                        onChangeText={(text) => setIdArrematante(text)}
                        keyboardType="numeric"
                        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
                    />
                    <Button title="Registrar um lance" onPress={createLance} />                
                    <FlatList
                        data={lances}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.container}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{item.id}</Text>
                                        <Text>{item.valor}</Text>
                                        <Text>{item.nome}</Text>  
                                        <Text>{item.valorMinimo}</Text>
                                        <Text>{item.leilaoAberto ? "sim" : "não"}</Text>                                                                
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        flexDirection: 'row',
    },
    title: {
        margin: 'auto',
    },
});



// const urlLance = 'https://leilao-rest-api.herokuapp.com/lance/';

// useEffect(() => {
//     fetchLance();
// }, []);

// const fetchLance = async () => {
//     try {
//         const response = await fetch(urlLance);
//         const data = await response.json();
//         setLances(data);
//     } catch (error) {
//         console.error('Erro ao ler lance do leilão', error);
//     } finally {
//         setLoading(false);
//     }
// };