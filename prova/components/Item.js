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
import { MaterialIcons } from '@expo/vector-icons';

export default function Item() {
    const url = 'https://leilao-rest-api.herokuapp.com/itemdeleilao/';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nome, setNome] = useState('');
    const [valorMinimo, setValorMinimo] = useState('');
    const [leilaoAberto, setLeilaoAberto] = useState('');
    //const [leilaoAberto, setLeilaoAberto] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Erro ao ler item do leilão', error);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async () => {

        try {
            const isLeilaoAberto = leilaoAberto.toLowerCase() === 'sim';

            const response = await fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    valorMinimo,
                    leilaoAberto: isLeilaoAberto
                }),
            });
            if (response.ok) {

                fetchProducts();

                setNome('');
                setValorMinimo('');
                setLeilaoAberto('');
            } else {
                console.error('Erro ao criar usuário');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao/' + id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    valorMinimo: valorMinimo,
                    leilaoAberto: leilaoAberto
                }),
            });

            if (response.ok) {
                removeItem(id);
                console.log('Item excluído com sucesso');
            } else {
                console.error('Erro ao excluir item:', response.status);
            }
        } catch (error) {
            console.error('Erro ao excluir item:', error);
        }
    };

    const removeItem = (id) => {
        setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
    };


    return (
        <View >
            <Text style={styles.title}>Itens de Leilão</Text>
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <View>
                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
                    />
                    <TextInput
                        placeholder="Valor Mínimo"
                        value={valorMinimo}
                        onChangeText={(text) => setValorMinimo(text)}
                        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
                    />
                    <TextInput
                        placeholder="Leilão Aberto (sim ou não)"
                        value={leilaoAberto}
                        onChangeText={(text) => setLeilaoAberto(text)}
                        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
                    />
                    <Button title="Cadastrar Usuário" onPress={createItem} />
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.container}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{item.nome}</Text>
                                        <Text>{item.valorMinimo}</Text>
                                        <Text>{item.leilaoAberto ? "sim" : "não"}</Text>
                                        <Pressable
                                            onPress={() => {
                                                deleteItem(item.id);
                                            }}>
                                            <MaterialIcons
                                                name="cancel"
                                                size={18}
                                                color="red"
                                                style={{ padding: 4 }}
                                            />
                                        </Pressable>
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

{/* <Text>{item.leilaoAberto.toString()}</Text>  */ }