
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useState } from 'react';
// import { View, Text, Button, Platform } from 'react-native';

// const CustomDatePicker = ({ onDateChange, value }) => {
//   const [date, setDate] = useState(value || new Date());
//   const [show, setShow] = useState(false);
//   const display = Platform.OS === 'ios' ? 'spinner' : 'default';

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(false);
//     setDate(currentDate);
//     if (onDateChange) {
//       onDateChange(currentDate);
//     }
//   };

//   return (
//     <View>
//       <Button onPress={() => setShow(true)} title="Show Date Picker" />
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode="date"
//           is24Hour={true}
//           display={display}
//           onChange={onChange}
//         />
//       )}

//     </View>
//   );
// };

// export default CustomDatePicker;




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
      // Optionally do something when the picker is shown
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
