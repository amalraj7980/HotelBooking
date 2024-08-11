import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, Image, SafeAreaView,
} from 'react-native';
import { homeApiCall, myBookingsApiCall } from '../../utils/apiCalls';
import { isResponseIsValid } from '../../utils/helpers';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await homeApiCall();
            if (isResponseIsValid(response)) {
                const data = response.data;
                setBookings(data);
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const renderBookingItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.houseName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.bookingDate}>Booked on: {item.dateBooked}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
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
    bookingDate: {
        fontSize: 14,
        color: '#95a5a6',
    },
});

export default MyBookings;
