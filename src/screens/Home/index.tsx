import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState } from 'react'

import { Tasks } from '../../components/Tasks';

import { styles } from './styles'

export default function Home() {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    //converter data para o formato pt-br ficando como: xx de xxxxxx de xxxx
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(new Date())

    const [tasks, setTasks] = useState<string[]>([]);
    const [taskName, setTaskName] = useState('');
    function handleTaskAdd() {
        if (tasks.includes(taskName)) {

            return Alert.alert("Tarefa existe", "Já existe uma tarefa na lista com esse nome")
        }
        setTasks(prevState => [...prevState, taskName])
        setTaskName('');
    }

    function handleTaskRemove(name: string) {

        Alert.alert("Remover", `Remover tarefa ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setTasks(prevState => prevState.filter(task => task !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }



    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Tarefas de hoje</Text>

            <Text style={styles.eventDate}>{formattedDate}</Text>
            <View style={styles.form}>

                <TextInput
                    style={styles.input}
                    placeholder='Nome da tarefa'
                    placeholderTextColor='#6b6b6b'
                    onChangeText={setTaskName}
                    value={taskName}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTaskAdd}
                >

                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>


            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Tasks
                        key={item}
                        task={item}
                        onRemove={() => handleTaskRemove(item)}
                    />
                )}

                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Nenhuma tarefa foi adicionada ainda. Adicione suas tarefas!
                    </Text>)}

            />




            <StatusBar style='auto' />
        </View>
    );
}