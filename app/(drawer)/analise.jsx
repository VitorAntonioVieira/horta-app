import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';
import { View } from 'react-native';
import { Text } from 'react-native';

const Analise = () => {
    const [sensor, setSensor] = useState([]);

    useEffect(() => {
        const moistureRef = ref(db, 'sensors/');
        onValue(moistureRef, (snapshot) => {
            const data = snapshot.val();
            const sensors = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log(sensors);
            setSensor(sensors);
        })
    })

    return (
        <View>
            <Text>{sensor}</Text>
        </View>
    )
}

export default Analise;
