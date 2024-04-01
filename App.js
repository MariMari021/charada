import React, { useState, useEffect } from 'react';
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
  },
  // Adicione mais charadas aqui
  {
    pergunta: 'O que é, o que é? Tem olhos, mas não vê; tem boca, mas não fala?',
    alternativas: ['Espelho', 'Livro', 'Lápis'],
    respostaCorreta: 'Espelho'
  },
  {
    pergunta: 'O que é, o que é? Tem chaves, mas não abre portas; tem espaço, mas não guarda nada?',
    alternativas: ['Teclado', 'Carteira', 'Guitarra'],
    respostaCorreta: 'Teclado'
  },
  {
    pergunta: 'O que é, o que é? Tem botões, mas não é roupa; tem cordas, mas não é violão?',
    alternativas: ['Rádio', 'Celular', 'Piano'],
    respostaCorreta: 'Piano'
  },
  {
    pergunta: 'O que é, o que é? Quanto mais se estuda, menos se sabe?',
    alternativas: ['Matemática', 'Egoísmo', 'Filosofia'],
    respostaCorreta: 'Filosofia'
  },
  {
    pergunta: 'O que é, o que é? Tem penas, mas não voa; tem um bico, mas não pica?',
    alternativas: ['Pinguim', 'Avestruz', 'Galinha'],
    respostaCorreta: 'Pinguim'
  },
];

const App = () => {



  const [round, setRound] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [charadasSelecionadas, setCharadasSelecionadas] = useState([]);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const selecionarCharadasAleatorias = () => {
      const charadasShuffled = shuffleArray([...charadas]);
      const charadasSelecionadas = charadasShuffled.slice(0, 5);
      setCharadasSelecionadas(charadasSelecionadas);
    };

    selecionarCharadasAleatorias();
  }, []);

  const responder = (resposta) => {
    if (resposta === charadasSelecionadas[round].respostaCorreta) {
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
    if (round < charadasSelecionadas.length - 1) {
      setRound(round + 1);
    } else {
      // Fim do jogo
      Alert.alert(
        'VitaMental',
        `Fim do jogo!\nAcertos: ${acertos}\nErros: ${erros}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setRound(0);
              setAcertos(0);
              setErros(0);
              setCharadasSelecionadas([]);
              setModalVisible(false);

              const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
              };

              const selecionarCharadasAleatorias = () => {
                const charadasShuffled = shuffleArray([...charadas]);
                const charadasSelecionadas = charadasShuffled.slice(0, 5);
                setCharadasSelecionadas(charadasSelecionadas);
              };

              selecionarCharadasAleatorias();
            }
          }
        ]
      ); // <-- Faltava fechar aqui
    }
    setRespostaSelecionada(null);
    setRespostaCorreta(null);
    setModalVisible(false);
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.pergunta}>
        {charadasSelecionadas.length > 0
          ? charadasSelecionadas[round].pergunta
          : "Carregando..."}
      </Text>
      {charadasSelecionadas.length > 0 &&
        charadasSelecionadas[round].alternativas.map((alternativa, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.botao,
              {
                backgroundColor:
                  respostaSelecionada === alternativa
                    ? respostaCorreta
                      ? '#719257'
                      : '#E1374C'
                    : '#3C4146',
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{mensagemModal}</Text>
          <TouchableOpacity
            style={[styles.botaoOk, { backgroundColor: '#3C4146' }]}
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
    marginBottom: 22,
    textAlign: 'center',
    width: 330,
    alignItems: 'center',
  },
  botao: {
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 290,
    height: 52,
    borderRadius: 25,
    textAlign: 'center',
    alignContent: 'center',
    border: '1px solid #d3d3d3'
  },
  botaoOk: {
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 16,
    marginLeft: 25,
    marginRight: 25,
  },
  textoBotao: {
    color: 'white',

    fontSize: 15
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
      border: '1px solid #d3d3d3'
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 17,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17
  },
});

export default App;
