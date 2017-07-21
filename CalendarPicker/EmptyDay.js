import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default function Day(props) {
  const {
    styles,
    showDayOfPreviousMonth,
    dayOfPreviousMonthStyle,
    onPressDay
  } = props;
  return (
    <View style={styles.dayWrapper}>
      <View style={styles.dayButton}>
        <TouchableOpacity
          onPress={() => !!showDayOfPreviousMonth && onPressDay(props.day) }
          style={styles.dayButton}
        >
          <Text style={[styles.dayLabel, dayOfPreviousMonthStyle]}>
            {showDayOfPreviousMonth ? props.day : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Day.propTypes = {
  styles: PropTypes.shape({}),
  day: PropTypes.number,
  onPressDay: PropTypes.func,
}
