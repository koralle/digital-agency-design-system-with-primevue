<script setup lang="ts">
import { useId } from 'vue';
import type { DatePickerProps, DatePickerEmits , DatePickerBlurEvent, DatePickerMonthChangeEvent, DatePickerYearChangeEvent } from './types'
import DatePicker from 'primevue/datepicker'

const {
  id = useId(),
  name,
  selectionMode,
  dateFormat,
  inline,
  showOtherMonths,
  selectOtherMonths,
  numberOfMonths,
  view,
  minDate,
  maxDate,
  disabledDates,
  disabledDays,
  maxDateCount,
  showOnFocus,
  showWeek,
  manualInput,
  size,
  invalid,
  disabled,
  readonly,
  placeholder,
  appendTo,
  inputId,
  fluid,
  ariaLabelledby,
  ariaLabel,
} = defineProps<DatePickerProps>()

const emit = defineEmits<DatePickerEmits>()

const handleValueChange = (value?: Date | Date[] | null | (Date | null)[]) => {
  emit('value-change', value)
}

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleDateSelect = (value: Date) => {
  emit('date-select', value)
}

const handleShow = () => {
  emit('show')
}

const handleHide = () => {
  emit('hide')
}

const handleTodayClick = () => {
  emit('today-click')
}

const handleClearClick = () => {
  emit('clear-click')
}

const handleMonthChange = (event: DatePickerMonthChangeEvent) => {
  emit('month-change', event)
}

const handleYearChange = (event: DatePickerYearChangeEvent) => {
  emit('year-change', event)
}

const handleBlur = (event: DatePickerBlurEvent) => {
  emit('blur', event)
}

const handleKeyDown = (event: Event) => {
  emit('keydown', event)
}
</script>

<template>
  <DatePicker
    unstyled
    :id
    :name
    :selection-mode
    :date-format
    :inline
    :show-other-months
    :select-other-months
    :number-of-months
    :view
    :min-date
    :max-date
    :disabled-dates
    :disabled-days
    :max-date-count
    :show-on-focus
    :show-week
    :manual-input
    :invalid
    :disabled
    :readonly
    :placeholder
    :append-to
    :input-id
    :fluid
    :aria-labelledby="ariaLabelledby"
    :aria-label

    @value-change="handleValueChange"
    @input="handleInput"
    @date-select="handleDateSelect"
    @show="handleShow"
    @hide="handleHide"
    @today-click="handleTodayClick"
    @clear-click="handleClearClick"
    @month-change="handleMonthChange"
    @year-change="handleYearChange"
    @blur="handleBlur"
    @keydown="handleKeyDown"
  >
  </DatePicker>
</template>
