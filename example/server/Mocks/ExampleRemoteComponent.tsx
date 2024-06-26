import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

const ExampleRemoteComponent = ({
  onAction,
}: {
  onAction: (action: any, payload: Record<string, any>) => void;
}) => {
  const [catFact, setCatFact] = useState<string>('');

  const onPress = useCallback(() => {
    if (onAction) {
      onAction('NAVIGATE', { route: 'DetailsScreen' });
    }
  }, [onAction]);

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then((resp) => resp.json())
      .then((json) => json.fact)
      .then((fact) => setCatFact(fact));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.hello}> Hello Remote Component</Text>
      <Text style={styles.catFactsTitle}> Cat Facts </Text>
      <Text style={styles.facts}> {catFact} </Text>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}> {`Server Navigate Action`} </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  hello: {
    color: 'red',
    fontWeight: 'bold',
  },
  catFactsTitle: {
    marginTop: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  facts: {
    marginTop: 10,
    color: 'black',
    fontWeight: '400',
  },
  text: {
    color: 'black',
    fontWeight: '400',
    alignContent: 'center',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    borderRadius: 3,
    padding: 5,
    backgroundColor: '#65A765',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default ExampleRemoteComponent;
