import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';

const CustomDatePicker = ({ onDateChange, value, show }) => {
  const [date, setDate] = useState(value || new Date());
  const display = Platform.OS === 'ios' ? 'spinner' : 'default';

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  useEffect(() => {
    if (show) {
    }
  }, [show]);

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display={display}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;
