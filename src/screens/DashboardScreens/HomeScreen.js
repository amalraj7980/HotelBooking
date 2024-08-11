import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Button, FlatList, TouchableOpacity,
    Image, SafeAreaView, TextInput, Alert
} from 'react-native';
import CustomModal from '../../components/CustomModal';
import { BookHotelApiCall, homeApiCall } from '../../utils/apiCalls';
import { isResponseIsValid } from '../../utils/helpers';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
// import { DateTimePicker } from '@react-native-community/datetimepicker';

const HomeScreen = () => {
    const [houses, setHouses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateString, setDateString] = useState(date.toDateString());

    const handleDateChange = (date) => {
        setShowDatePicker(false)
        setDate(date);
        console.log("date-->", date)
        setDateString(date.toDateString());
    };


    const handleBooking = (id) => {
        const house = houses.find((house) => house._id === id);
        setSelectedHouse(house);
        setModalVisible(true);
    };

    useEffect(() => {
        fetchAllHouse();
    }, []);

    const fetchAllHouse = async () => {
        try {
            const response = await homeApiCall();
            if (isResponseIsValid(response)) {
                const data = response.data;
                setHouses(data);
            }
        } catch (err) {
            console.error('Error fetching houses:', err);
        }
    };
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [month, day, year].join('/');
    };
    const handleHotelBooking = async () => {
        const formattedDate = formatDate(date);
        if (date) {
            try {
                bookingParams = {
                    productId: selectedHouse._id,
                    userId: "66b7c3181ab51ebead00c176",
                    date: formattedDate
                };
                const response = await BookHotelApiCall(bookingParams);
                if (isResponseIsValid(response)) {
                    const data = response.data;
                    console.log("data-->2", data)
                    setModalVisible(false);
                    setDate(new Date())
                    const updatedHouses = houses.map((house) =>
                        house._id === selectedHouse._id ? { ...house, isBooked: true, dateBooked: date } : house
                    );
                    setHouses(updatedHouses);
                    Alert.alert('Booking successful');
                }
                else {
                    console.log(" err res--->", response)
                    if(response.status ==400){
                        Alert.alert(response.data.message);
                    }
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            Alert.alert('Please fill all the fields');
        }
    };

    const renderHouseItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.houseName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Button
                    title={item.isBooked ? 'Booked' : 'Book Now'}
                    onPress={() => !item.isBooked && handleBooking(item._id)}
                    color={item.isBooked ? '#7f8c8d' : '#3498db'}
                    disabled={item.isBooked}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={houses}
                renderItem={renderHouseItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                containerStyle={styles.modalContainer}
                contentStyle={styles.modalContent}
            >
                <Text style={styles.modalTitle}>Booking Details</Text>
                <CustomTextInput
                    value={dateString}
                    onChangeText={() => { }}
                    placeholder="Select a date"
                    label="Date"
                    editable={false}
                    onPressIn={() => setShowDatePicker(true)}
                />
                <CustomDatePicker
                    value={date}
                    onDateChange={handleDateChange}
                    show={showDatePicker}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleHotelBooking}
                    >
                        <Text style={styles.submitButtonText}>Book Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    list: {
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 12,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    houseName: {
        fontSize: 20,
        color: '#2c3e50',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        color: '#2c3e50',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HomeScreen;
