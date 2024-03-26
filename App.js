import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';


const charadas = [
  {
    pergunta: 'O que é, o que é? Quanto mais seca, mais molhada ela fica?',
    alternativas: ['Toalha', 'Areia', 'Fogo'],
    respostaCorreta: 'Areia'
  },
  {
    pergunta: 'O que é, o que é? Tem asas, mas não voa; tem um bico, mas não pica?',
    alternativas: ['Avião', 'Abelha', 'Pássaro'],
    respostaCorreta: 'Avião'
  },
  {
    pergunta: 'O que é, o que é? Quanto mais se tira, mais ele cresce?',
    alternativas: ['Cabelo', 'Unha', 'Dente'],
    respostaCorreta: 'Buraco'
  },
  {
    pergunta: 'O que é, o que é? Tem coroa, mas não é rei; tem escamas, mas não é peixe?',
    alternativas: ['Sapato', 'Árvore', 'Abacaxi'],
    respostaCorreta: 'Abacaxi'
  },
  {
    pergunta: 'O que é, o que é? Tem raízes, mas não é planta; tem coroa, mas não é rei?',
    alternativas: ['Dente', 'Casa', 'Cabelo'],
    respostaCorreta: 'Dente'
  },
  {
    pergunta: 'O que é, o que é? Quanto mais se perde, mais se tem?',
    alternativas: ['Idade', 'Experiência', 'Tempo'],
    respostaCorreta: 'Tempo'
  },
  {
    pergunta: 'O que é, o que é? Tem cabeça, mas não pensa; tem boca, mas não come?',
    alternativas: ['Garrafa', 'Bule', 'Rio'],
    respostaCorreta: 'Rio'
  },
  {
    pergunta: 'O que é, o que é? Fica em pé sem pernas, chora sem ter olhos?',
    alternativas: ['Nuvem', 'Cebola', 'Chuva'],
    respostaCorreta: 'Nuvem'
  },
  {
    pergunta: 'O que é, o que é? Anda sempre, mas nunca sai do lugar?',
    alternativas: ['Carro', 'Relógio', 'Estrada'],
    respostaCorreta: 'Relógio'
  }
];



const App = () => {
  const [round, setRound] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');

  const responder = (resposta) => {
    if (resposta === charadas[round].respostaCorreta) {
      setAcertos(acertos + 1);
      setRespostaCorreta(true);
      setMensagemModal('Você acertou! Ir para a próxima charada.');
    } else {
      setErros(erros + 1);
      setRespostaCorreta(false);
      setMensagemModal('Não foi dessa vez! Ir para a próxima charada.');
    }
    setRespostaSelecionada(resposta);
    setModalVisible(true);
  };

  const proximaCharada = () => {
    if (round < charadas.length - 1) {
      setRound(round + 1);
    } else {
      // Fim do jogo
      Alert.alert(
        'VitaMental',
        `Fim do jogo!\nAcertos: ${acertos}\nErros: ${erros}`
      );
      setRound(0);
      setAcertos(0);
      setErros(0);
    }
    setRespostaSelecionada(null);
    setRespostaCorreta(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>{charadas[round].pergunta}</Text>
      {charadas[round].alternativas.map((alternativa, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.botao,
            {
              backgroundColor:
                respostaSelecionada === alternativa
                  ? respostaCorreta
                    ? 'green'
                    : 'red'
                  : '#2196F3',
            },
          ]}
          onPress={() => responder(alternativa)}
          disabled={respostaSelecionada !== null}
        >
          <Text style={styles.textoBotao}>{alternativa}</Text>
        </TouchableOpacity>
      ))}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{mensagemModal}</Text>
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: '#2196F3' }]}
            onPress={proximaCharada}
          >
            <Text style={styles.textoBotao}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pergunta: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  botao: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;

