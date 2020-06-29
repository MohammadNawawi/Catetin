import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import colors from '../Colors';

export default class AddListModal extends React.Component {
    backgroundColors = ["#5cd859", "#24a6d9", "#595bd9", "#8022d9", "#d159d8", "#d85963", "#d88559"];
    
    state = {
        name: "",
        color: this.backgroundColors[0]
    };

    createTodo = () => {
        const { name, color } = this.state;
        
        const list = { name, color };

        this.props.addList(list);

        // if (this.state.name.trim().length < 1) {
        //     alert('List name is Empty!')
        //     return;
        // }
        this.setState({ name: "" });
        this.props.closeModal();
    }

    renderColors(){
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => this.setState({ color })} />
            );
        });
    }

    onSubmit = () => {
        if (this.state.name.trim().length < 1) {
            Alert.alert('Alert', 'Password must be minimum 8 characters')
            return;
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TouchableOpacity style={{ position: "absolute", top: 32, right: 32 }} onPress={this.props.closeModal}>
                    <Image source={require('../assets/icon/cancel.png')} style={{height:24, width:24}}/>
                </TouchableOpacity>

                <View style={{alignSelf:"stretch", marginHorizontal:32}}>
                    <Text style={styles.title}>Create Todo List</Text>
                    <TextInput style={styles.input} placeholder="List Name?" onChangeText={text => this.setState({ name: text })}  isRequired={true}/>
                    
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:12}}>{this.renderColors()}</View>
                    
                    <TouchableOpacity style={[styles.create, {backgroundColor:this.state.color}]} onPress={this.createTodo}>
                        <Text style={{ color: colors.white, fontWeight:"600"}}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom:16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        // fontWeight:"bold"
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius:4
    }
});

