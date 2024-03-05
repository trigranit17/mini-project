// QuizListScreen.js dalam React Native
import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';

const QuizListScreen = ({navigation}) => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:8080/backend');
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const data = await response.json();
                setQuizzes(data.quizzes);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <View>
            <FlatList
                data={quizzes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Button
                            title="Start Quiz"
                            onPress={() => navigation.navigate('Quiz', {quizId: item.id})}/>
                    </View>
                )}/>
        </View>
    );
};

export default QuizListScreen;
