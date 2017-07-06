import React, { PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Utils } from './Utils';

export default function Weekdays(props) {
  const { styles, startFromMonday, weekdays, textStyle, weekdayStyle, weekdayTextStyle } = props;
  let wd = weekdays;
  if (!wd) {
    wd = startFromMonday? Utils.WEEKDAYS_MON : Utils.WEEKDAYS; // English Week days Array
  }

  return (
    <View style={[styles.dayLabelsWrapper, weekdayStyle]}>
      { wd.map((day, key) => {
          return (
            <Text key={key} style={[styles.dayLabels, textStyle, weekdayTextStyle]}>
              {day}
            </Text>
          );
        })
      }
    </View>
  );
}

Weekdays.propTypes = {};
