/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';



const App = () => {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ consultarAPI, guardarConsultarAPI ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ cargando, guardarCargando ] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
    if(consultarAPI) {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
     
      const resultado = await url;

      guardarCargando(true)

      // Ocultar spinner y mostrar resultado
      setTimeout(() => {
        guardarResultado(resultado.padStart.Fisplay[criptomoneda][moneda])

        guardarConsultarAPI(false)

        guardarCargando(false)
      })
    }
  }
    cotizarCriptomoneda();
  }, [consultarAPI])

  const componente = cargando ? <ActivityIndicator size='large' color="#5E49E2" /> : <Cotizacion resultado={resultado} />;


  return (
    <>
    <ScrollView>
      <Header />

      <Image source={ require('./assets/img/cryptomonedas.png') } style={styles.imagen}/>
<View style={styles.contenido}>
  <Formulario
  moneda={moneda}
  criptomoneda={criptomoneda}
  guardarMoneda={guardarMoneda}
  guardarCriptomoneda={guardarCriptomoneda}
  guardarConsultarAPI={guardarConsultarAPI} />
</View>
<View style={{ marginTop: 40}}>
{componente}
</View>

</ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
