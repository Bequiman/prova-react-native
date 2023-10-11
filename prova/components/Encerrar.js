import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Pressable,
} from "react-native";

export default function Encerrar() {
  const [idItem, setIdItem] = useState('');

  const closeAuction = async () => {
    try {
      const response = await fetch(
        "https://leilao-rest-api.herokuapp.com/itemdeleilao/" + idItem,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idItem,
          }),
        }
      );

      if (response.ok) {
        idItem('');
        console.log("Leilão encerrado com sucesso");
      } else {
        idItem('');
        console.error("Erro ao encerrar leilão");
      }
    } catch (error) {
      idItem('');
      console.error("Erro ao encerrar leilão:", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Id do leilão"
        value={idItem}
        onChangeText={(text) => setIdItem(text)}
        keyboardType="numeric"
        style={{ fontSize: 18, marginBottom: 12, padding: 8, borderWidth: 1 }}
      />
      <Button title="Encerrar Leilão" onPress={closeAuction} />
    </View>
  );
}
