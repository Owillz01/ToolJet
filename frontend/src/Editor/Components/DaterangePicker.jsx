import React, { useState, useRef, useEffect } from 'react';
import 'react-datetime/css/react-datetime.css';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { isEmpty } from 'lodash';
import moment from 'moment';

export const DaterangePicker = function DaterangePicker({
  height,
  properties,
  styles,
  exposedVariables,
  setExposedVariable,
  width,
}) {
  const { borderRadius, visibility, disabledState } = styles;
  const { defaultStartDate, defaultEndDate } = properties;
  const formatProp = properties.format;

  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, setStartDate] = useState(moment(defaultStartDate, formatProp));
  const [endDate, setEndDate] = useState(moment(defaultEndDate, formatProp));

  const dateRangeRef = useRef(null);

  useEffect(() => {
    const startDateProp = isEmpty(exposedVariables.startDate)
      ? moment(defaultStartDate, formatProp)
      : moment(exposedVariables.startDate, formatProp);
    const endDateProp = isEmpty(exposedVariables.endDate)
      ? moment(defaultEndDate, formatProp)
      : moment(exposedVariables.endDate, formatProp);
    setStartDate(startDateProp);
    setEndDate(endDateProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultEndDate, defaultStartDate, formatProp]);

  useEffect(() => {
    dateRangeRef.current.container.querySelector('.DateRangePickerInput').style.borderRadius = `${Number.parseFloat(
      borderRadius
    )}px`;
    dateRangeRef.current.container.querySelector('.DateRangePickerInput').style.height = `${height}px`;
    dateRangeRef.current.container.querySelector('.DateRangePickerInput').style.width = `${width - 3}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeRef.current, borderRadius, height, width]);

  function onDateChange(dates) {
    const start = dates.startDate;
    const end = dates.endDate;

    if (start) {
      setExposedVariable('startDate', start.format(formatProp));
    }

    if (end) {
      setExposedVariable('endDate', end.format(formatProp));
    }

    setStartDate(start);
    setEndDate(end);
  }

  function focusChanged(focus) {
    setFocusedInput(focus);
  }

  return (
    <div className="daterange-picker-widget p-0" style={{ height, display: visibility ? '' : 'none' }}>
      <DateRangePicker
        disabled={disabledState}
        startDate={startDate}
        startDateId="startDate"
        isOutsideRange={() => false}
        endDate={endDate}
        endDateId="endDate"
        onDatesChange={(dates) => onDateChange(dates)}
        onFocusChange={(focus) => focusChanged(focus)}
        focusedInput={focusedInput}
        hideKeyboardShortcutsPanel={true}
        displayFormat={formatProp}
        ref={dateRangeRef}
      />
    </div>
  );
};
