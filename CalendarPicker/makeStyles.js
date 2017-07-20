/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
const DEFAULT_SELECTED_BACKGROUND_COLOR = '#5ce600';
const DEFAULT_SELECTED_TEXT_COLOR = '#000000';
const DEFAULT_TODAY_BACKGROUD_COLOR = '#CCCCCC';

export function makeStyles(scaler, backgroundColor, textColor, todayBackgroundColor, circleDayHeight, dayFontSize) {
  const SELECTED_BG_COLOR = backgroundColor ? backgroundColor : DEFAULT_SELECTED_BACKGROUND_COLOR;
  const SELECTED_TEXT_COLOR = textColor ? textColor : DEFAULT_SELECTED_TEXT_COLOR;
  const TODAY_BG_COLOR = todayBackgroundColor ? todayBackgroundColor : DEFAULT_TODAY_BACKGROUD_COLOR;
  const DEFAULT_WIDTH = circleDayHeight || 30 * scaler;
  const DEFAULT_DAY_FONTSIZE = dayFontSize || 14 * scaler;
  return {
    calendar: {
      height: 320 * scaler,
      marginTop: 10 * scaler
    },

    dayButton: {
      width: 50 * scaler,
      height: 40 * scaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayButtonSelected: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_WIDTH,
      borderRadius: DEFAULT_WIDTH / 2,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center'
    },

    dayLabel: {
      fontSize: DEFAULT_DAY_FONTSIZE,
      color: '#000',
      alignSelf: 'center',
      justifyContent: 'center'
    },

    selectedDayLabel: {
      color: SELECTED_TEXT_COLOR,
    },

    dayLabelsWrapper: {
      flexDirection: 'row',
      marginBottom: 10 * scaler,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      paddingTop: 10 * scaler,
      paddingBottom: 10 * scaler,
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: 'rgba(0,0,0,0.2)'
    },

    daysWrapper: {
      alignSelf: 'center'
    },

    dayLabels: {
      width: 50 * scaler,
      fontSize: 12 * scaler,
      color: '#000',
      textAlign: 'center'
    },

    selectedDay: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_WIDTH,
      backgroundColor: SELECTED_BG_COLOR,
      borderRadius: DEFAULT_WIDTH,
      alignSelf: 'center'
    },

    selectedToday: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_WIDTH,
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: DEFAULT_WIDTH,
      alignSelf: 'center'
    },

    dayWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50 * scaler,
      height: 40 * scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    startDayWrapper: {
      width: 50 * scaler,
      height: DEFAULT_WIDTH,
      borderTopLeftRadius: 20 * scaler,
      borderBottomLeftRadius: 20 * scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
    },

    endDayWrapper: {
      width: 50 * scaler,
      height: DEFAULT_WIDTH,
      borderTopRightRadius: 20 * scaler,
      borderBottomRightRadius: 20 * scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
    },

    inRangeDay: {
      width: 50 * scaler,
      height: DEFAULT_WIDTH,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
    },

    monthLabel: {
      fontSize: 16 * scaler,
      color: '#000',
      width: 180 * scaler,
      textAlign: 'center'
    },

    headerWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 10 * scaler,
      padding: 5 * scaler,
      paddingBottom: 3 * scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    monthSelector: {
      width: 80 * scaler
    },

    prev: {
      textAlign: 'left',
      fontSize: 14 * scaler
    },

    next: {
      textAlign: 'right',
      fontSize: 14 * scaler
    },

    yearLabel: {
      fontSize: 14 * scaler,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center'
    },

    weeks: {
      flexDirection: 'column'
    },

    weekRow: {
      flexDirection: 'row'
    },

    disabledText: {
      fontSize: 14 * scaler,
      color: '#BBBBBB',
      marginTop: -10,
      alignSelf: 'center'
    },
    previousControl: {
      alignItems: 'flex-start'
    },
    nextControl: {
      alignItems: 'flex-end'
    },
    eventStyle: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_WIDTH,
      borderRadius: DEFAULT_WIDTH,
      alignSelf: 'center',
      borderColor: SELECTED_BG_COLOR,
      borderWidth: 1,
      backgroundColor: '#fff',
    }
  };
}
