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

export default function Participante() {
    const url_cadastrar = 'https://leilao-rest-api.herokuapp.com/participante';
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch(url_cadastrar)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Erro ao ler usuários', error));
    }, []);

    const createUser = () => {
        fetch(url_cadastrar, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                cpf,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Erro ao criar usuário:', error);                  
                }
            })
            .then(() => {
                fetch(url_cadastrar)
                    .then((response) => response.json())
                    .then((data) => setUsers(data))
                    .catch((error) => console.error(error));
                setNome('');
                setCPF('');
            })
            .catch((error) => console.error('Erro ao criar usuário:', error));
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch('https://leilao-rest-api.herokuapp.com/participante/' + id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf,
                }),
            });

            if (response.ok) {
                removeUser(id);
                console.log('Usuário excluído com sucesso');
            } else {
                console.error('Erro ao excluir usuário:', response.status);
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    const removeUser = (id) => {
        setUsers((prevUsers) => prevUsers.filter((item) => item.id !== id));
    };


    return (
        <View style={{ flex: 0, padding: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>
                Cadastro de Usuários
            </Text>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
                style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
            />
            <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={(text) => setCPF(text)}
                style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
            />
            <Button title="Cadastrar Usuário" onPress={createUser} />
            <Text style={{ fontSize: 24, marginTop: 16 }}>Lista de Usuários</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                        }}>
                        <Text>{item.id}</Text>
                        <Text style={styles.name}>{item.nome}</Text>
                        <Text style={styles.email}>{item.cpf}</Text>
                        <Pressable
                            onPress={() => {
                                deleteUser(item.id);                               
                            }}>
                            <MaterialIcons
                                name="cancel"
                                size={18}
                                color="red"
                                style={{ padding: 4 }}
                            />
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 12,
        marginRight: 8,
        flex: 2,
    },
    email: {
        fontSize: 12,
        marginRight: 8,
        flex: 3,
    },
});

// if (response.status === 200) {
//     removeUser(id);
//     console.log('Usuário excluído com sucesso');
// } else {
//     console.error('Erro ao excluir usuário:', response.status);
// }

// onPress={() => {
//     deleteUser(item.id);
//     removeUser(item.id);
// }}>


// onPress={() => {
//     deleteUser(item.id)
//         .then(() => {
//             removeUser(item.id);
//         })
//         .catch((error) => {
//             console.error('Erro ao excluir usuário:', error);
//         });
// }}>




