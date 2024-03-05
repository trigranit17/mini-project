import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';

const QuizListScreen = ({navigation}) => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:8080/backend'); // Ganti dengan URL API backend Anda
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={quizzes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.quizItem}>
                        <Text style={styles.quizTitle}>{item.judul}</Text>
                        <Button
                            title="Start Quiz"
                            onPress={() => navigation.navigate('Quiz', {quizId: item.id})}/>
                    </View>
                )}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    quizItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default QuizListScreen;
