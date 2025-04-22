# 日付入力(DateInput)

## Props

PrimeVueのDatePickerPropsを継承する。ただし、実際には `../../utils` の `ComponentProps` を使用して `ComponentProps<DatePickerProps>` の形で継承する。
また、`ComponentProps<DatePickerProps>` に対して、不要なpropsはOmitする。Omitするpropsは以下の通り。

- showIcon
- iconDisplay
- icon
- prevIcon
- nextIcon
- incrementIcon
- decrementIcon
- responsiveOptions
- breakpoint
- autoZIndex
- baseZIndex
- showButtonBar
- showYearCutoff
- showTime
- timeOnly
- hourFormat
- stepHour
- stepMinute
- stepSecond
- showSeconds
- hideOnDateTimeSelect
- hideOnRangeSelection
- timeSeparator
- variant
- 
- inputStyle
- inputClass
- panelStyle
- panelClass
- todayButtonProps
- clearButtonProps
- navigatorButtonProps
- timePickerButtonProps
- formControl

※ pt, ptOptions, unstyledはOmitしなくて良いし、再定義もしなくて良いです。

### Propsのフォーマット

```ts
export interface DatePickerProps extends /* @vue-ignore */ Omit<ComponentProps<PrimeVueDatePickerProps>, 'showIcon' | 'iconDisplay' | ... > {
  /**
   * @description 日付入力コンポーネントの要素ID
   */
  id?: string
  
  // ... Omitしていないpropsを全て再定義する
}
```

## Emits

https://primevue.org/datepicker/#api.datepicker.emits に記載されているものは全て再定義します。

### フォーマット

```ts
export interface DatePickerEmits {
  'update:modelValue': [value: undefined | null | Date | Date[] | (null | Date)[]]
}
```
