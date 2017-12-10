import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {makeStyles} from './makeStyles';
import {Utils} from './Utils';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
import Swiper from './Swiper';

const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_RIGHT = 'SWIPE_RIGHT';

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export default class CalendarPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonth: props.selectedDate ? props.selectedDate.getMonth() : null,
      currentYear: props.selectedDate ? props.selectedDate.getFullYear() : null,
      selectedStartDate: props.selectedDate ? props.selectedDate : null,
      selectedEndDate: null,
      styles: {},
    };
    this.updateScaledStyles = this.updateScaledStyles.bind(this);
    this.updateMonthYear = this.updateMonthYear.bind(this);
    this.handleOnPressPrevious = this.handleOnPressPrevious.bind(this);
    this.handleOnPressNext = this.handleOnPressNext.bind(this);
    this.handleOnPressDay = this.handleOnPressDay.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.handleOnPressDayOfPreviousMonth = this.handleOnPressDayOfPreviousMonth.bind(this);
    this.handleOnPressDayOfNextMonth = this.handleOnPressDayOfNextMonth.bind(this);
  }

  static defaultProps = {
    initialDate: new Date(),
    scaleFactor: 375,
  }

  componentWillMount() {
    this.setState({...this.updateScaledStyles(this.props), ...this.updateMonthYear(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    let newStyles = {};
    if (nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height) {
      newStyles = this.updateScaledStyles(nextProps);
    }

    let newMonthYear = {}

    if (nextProps.initialDate.getTime() !== this.props.initialDate.getTime()) {
      this.updateMonthYear(nextProps, {});
    }

    this.setState({...newStyles, ...newMonthYear});
  }

  componentDidMount() {
    // propagate to parent date has changed
    if (this.props.selectedDate) {
      this.handleOnPressDay(this.props.selectedDate.getDate(), Utils.START_DATE);
    }
  }

  updateScaledStyles(props) {
    const {
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width, height,
      circleDayHeight,
      textStyle
    } = props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width ? width : Dimensions.get('window').width;
    const containerHeight = height ? height : Dimensions.get('window').height;

    const initialScale = Math.min(containerWidth, containerHeight) / scaleFactor;

    return {styles: makeStyles(initialScale, selectedDayColor, selectedDayTextColor, todayBackgroundColor, circleDayHeight, textStyle.fontSize)};
  }

  updateMonthYear(props) {
    return {
      currentMonth: parseInt(props.initialDate.getMonth()),
      currentYear: parseInt(props.initialDate.getFullYear()),
    };
  }

  handleOnPressDay(day, type) {
    const {
      currentYear,
      currentMonth,
      selectedStartDate,
      selectedEndDate,
    } = this.state;

    const {
      allowRangeSelection,
      onDateChange,
    } = this.props;

    const date = new Date(currentYear, currentMonth, day);

    if (allowRangeSelection &&
      selectedStartDate &&
      date >= selectedStartDate &&
      !selectedEndDate) {
      this.setState({
        selectedEndDate: date,
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.END_DATE);
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
      // propagate to parent date has changed
      onDateChange(date, Utils.START_DATE);
    }
  }

  handleOnPressPrevious() {
    const {currentMonth, currentYear} = this.state;
    const previousMonth = currentMonth - 1;

    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    const month = previousMonth < 0 ? parseInt(11) : parseInt(previousMonth);
    const year = previousMonth < 0 ? parseInt(currentYear) - 1 : parseInt(currentYear);

    this.setState({
      currentMonth: month,
      currentYear: year,
    });

    this.props.onMonthChange && this.props.onMonthChange(year, month);
  }

  handleOnPressNext() {
    const {currentMonth, currentYear} = this.state;
    const nextMonth = currentMonth + 1;
    // if nextMonth is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    const month = nextMonth > 11 ? parseInt(0) : parseInt(nextMonth);
    const year = nextMonth > 11 ? parseInt(currentYear) + 1 : parseInt(currentYear);

    this.setState({
      currentMonth: month,
      currentYear: year,
    });

    this.props.onMonthChange && this.props.onMonthChange(year, month);
  }

  onSwipe(gestureName) {
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handleOnPressNext();
        break;
      case SWIPE_RIGHT:
        this.handleOnPressPrevious();
        break;
    }
  }

  handleOnPressDayOfPreviousMonth(day) {
    const {
      currentYear,
      currentMonth,
    } = this.state;

    const {
      onDateChange
    } = this.props;

    const previousMonth = currentMonth - 1;

    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December

    let date = null;

    if (previousMonth < 0) {
      date = new Date(parseInt(currentYear) - 1, 11, day);
      this.setState({
        currentMonth: parseInt(11), // setting month to December
        currentYear: parseInt(currentYear) - 1, // decrement year
        selectedStartDate: date
      });
    } else {
      date = new Date(parseInt(currentYear), parseInt(previousMonth), day);
      this.setState({
        currentMonth: parseInt(previousMonth),
        currentYear: parseInt(currentYear),
        selectedStartDate: date
      });
    }

    // propagate to parent date has changed
    onDateChange(date, Utils.START_DATE);
  }

  handleOnPressDayOfNextMonth(day) {
    const {
      currentYear,
      currentMonth,
    } = this.state;

    const {
      onDateChange
    } = this.props;

    const nextMonth = currentMonth + 1;

    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December

    let date = null;

    if (nextMonth > 11) {
      date = new Date(parseInt(currentYear) + 1, 0, day);
      this.setState({
        currentMonth: parseInt(0), // setting month to December
        currentYear: parseInt(currentYear) + 1, // decrement year
        selectedStartDate: date
      });
    } else {
      date = new Date(parseInt(currentYear), parseInt(nextMonth), day);
      this.setState({
        currentMonth: parseInt(nextMonth),
        currentYear: parseInt(currentYear),
        selectedStartDate: date
      });
    }

    // propagate to parent date has changed
    onDateChange(date, Utils.START_DATE);
  }

  render() {

    const {
      currentMonth,
      currentYear,
      selectedStartDate,
      selectedEndDate,
      styles,
    } = this.state;

    const {
      allowRangeSelection,
      startFromMonday,
      initialDate,
      minDate,
      maxDate,
      weekdays,
      months,
      previousTitle,
      nextTitle,
      previousElement,
      nextElement,
      textStyle,
      headerStyle,
      headerTextStyle,
      weekdayStyle,
      weekdayTextStyle,
      toDateTextStyle,
      dayOfPreviousMonthStyle,

      eventDates,
      selectedDate
    } = this.props;

    let showDayOfPreviousMonth = this.props.showDayOfPreviousMonth || true;
    return (
      <Swiper
        onSwipe={(direction) => this.onSwipe(direction)}
        config={swipeConfig}
      >
        <View syles={styles.calendar}>
          <HeaderControls
            styles={styles}
            currentMonth={currentMonth}
            currentYear={currentYear}
            initialDate={initialDate}
            onPressPrevious={this.handleOnPressPrevious}
            onPressNext={this.handleOnPressNext}
            months={months}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            previousElement={previousElement}
            nextElement={nextElement}
            textStyle={textStyle}
            headerStyle={headerStyle}
            headerTextStyle={headerTextStyle}
          />
          <Weekdays
            styles={styles}
            startFromMonday={startFromMonday}
            weekdays={weekdays}
            textStyle={textStyle}
            weekdayStyle={weekdayStyle}
            weekdayTextStyle={weekdayTextStyle}
          />
          <DaysGridView
            month={currentMonth}
            year={currentYear}
            styles={styles}
            onPressDay={this.handleOnPressDay}
            startFromMonday={startFromMonday}
            allowRangeSelection={allowRangeSelection}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            minDate={minDate && minDate.setHours(0, 0, 0, 0)}
            maxDate={maxDate && maxDate.setHours(0, 0, 0, 0)}
            textStyle={textStyle}
            toDateTextStyle={toDateTextStyle}
            eventDates={eventDates}
            dayOfPreviousMonthStyle={dayOfPreviousMonthStyle}
            showDayOfPreviousMonth={showDayOfPreviousMonth}
            onPressDayOfPreviousMonth={this.handleOnPressDayOfPreviousMonth}
            onPressDayOfNextMonth={this.handleOnPressDayOfNextMonth}
          />
        </View>
      </Swiper>
    );
  }
}
