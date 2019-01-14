import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, Button, FormInput, List, ListItem } from 'react-native-elements';
import { SQLite, MapView } from 'expo';

const db = SQLite.openDatabase('myPlacesDB.db');

export default class Home extends React.Component {

    static navigationOptions = { title: 'HomePlaces', };

    constructor(props) {
        super(props);
        this.state = {
            myPlaces: '',
            placesList: []
        }
    }

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql('create table if not exists placesTable(id integer primary key not null, myPlaces text)');
        });
        this.updateList();
    }

    //update list to myPlacesDB
    updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from placesTable', [], (_, { rows }) =>
                this.setState({ placesList: rows._array })
            );
        });
    }

    //Add address to list

    saveButton = () => {
        db.transaction(tx => {
            tx.executeSql('insert into placesTable(myPlaces) values (?)', [this.state.myPlaces]);
        }, null, this.updateList)
    }

    //delete address from place table

    deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from placesTable where id = ?;`, [id]);

        }, null, this.updateList)

    }

    listSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%"
                }}
            />
        );

    }
    renderList = () => {
        const { navigate } = this.props.navigation;
        const placesList2 = this.state.placesList.map((value, k) => {
            return (
                <ListItem
                    title={value.myPlaces}
                    key={k}
                    rightTitle="show on map"
                    onPress={() => navigate('Map', { maps: value.myPlaces })}
                    onLongPress={() => this.deleteItem(value.id)}
                />
            )
        })
        return placesList2;
    }

    render() {
        return (
            <View>
                <FormLabel>PLACEFINDER</FormLabel>
                <FormInput
                    placeholder='Enter Address'
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 18,
                        width: 200,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(myPlaces) => this.setState({ myPlaces })}
                    value={this.state.myPlaces} />
                <Button
                    onPress={this.saveButton}
                    title="SAVE"
                />
                <List containerStyle={{ marginBottom: 20 }}>
                    {this.renderList()}
                </List>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});





