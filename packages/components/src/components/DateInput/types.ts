import { ComponentProps } from '../../utils'
import type {
  DatePickerProps as PrimeVueDatePickerProps,
  DatePickerMonthChangeEvent as PrimeVueDatePickerMonthChangeEvent,
  DatePickerYearChangeEvent as PrimeVueDatePickerYearChangeEvent,
  DatePickerBlurEvent as PrimeVueDatePickerBlurEvent,
} from 'primevue/datepicker'

export interface DatePickerProps
  extends /* @vue-ignore */ Omit<
    ComponentProps<PrimeVueDatePickerProps>,
    | 'defaultValue'
    | 'showIcon'
    | 'iconDisplay'
    | 'icon'
    | 'prevIcon'
    | 'nextIcon'
    | 'incrementIcon'
    | 'decrementIcon'
    | 'responsiveOptions'
    | 'breakpoint'
    | 'autoZIndex'
    | 'baseZIndex'
    | 'showButtonBar'
    | 'showYearCutoff'
    | 'showTime'
    | 'timeOnly'
    | 'hourFormat'
    | 'stepHour'
    | 'stepMinute'
    | 'stepSecond'
    | 'showSeconds'
    | 'hideOnDateTimeSelect'
    | 'hideOnRangeSelection'
    | 'timeSeparator'
    | 'variant'
    | 'inputStyle'
    | 'inputClass'
    | 'panelStyle'
    | 'panelClass'
    | 'todayButtonProps'
    | 'clearButtonProps'
    | 'navigatorButtonProps'
    | 'timepickerButtonProps'
    | 'formControl'
  > {
  /**
   * @description 日付入力コンポーネントの要素ID
   */
  id?: string

  /**
   * @description 双方向データバインディングの値
   */
  modelValue?: Date | Date[] | null | (Date | null)[]

  /**
   * @description 名前
   */
  name?: string

  /**
   * @description 日付選択モード
   * @default 'single'
   */
  selectionMode?: 'single' | 'multiple' | 'range'

  /**
   * @description 日付の形式
   * @default 'mm/dd/yy'
   */
  dateFormat?: string

  /**
   * @description インラインカレンダー表示
   * @default false
   */
  inline?: boolean

  /**
   * @description 他の月の日付を選択可能にする
   * @default false
   */
  showOtherMonths?: boolean

  /**
   * @description 他の月の日付を選択可能にする
   * @default false
   */
  selectOtherMonths?: boolean

  /**
   * @description 表示するカレンダーの数
   * @default 1
   */
  numberOfMonths?: number

  /**
   * @description 表示モード
   * @default 'date'
   */
  view?: 'date' | 'month' | 'year'

  /**
   * @description 最小選択可能日付
   */
  minDate?: Date

  /**
   * @description 最大選択可能日付
   */
  maxDate?: Date

  /**
   * @description 無効な日付
   */
  disabledDates?: Date[]

  /**
   * @description 無効な曜日
   */
  disabledDays?: number[]

  /**
   * @description 最大選択可能日付の数
   */
  maxDateCount?: number

  /**
   * @description フォーカス時に表示
   * @default true
   */
  showOnFocus?: boolean

  /**
   * @description
   */
  showWeek?: boolean

  /**
   * @description 手動入力の許可
   * @default true
   */
  manualInput?: boolean

  /**
   * @description 日付入力コンポーネントのサイズ
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * @description 無効状態のスタイル表示
   * @default false
   */
  invalid?: boolean

  /**
   * @description 無効状態
   * @default false
   */
  disabled?: boolean

  /**
   * @description 読み取り専用状態
   * @default false
   */
  readonly?: boolean

  /**
   * @description プレースホルダーテキスト
   */
  placeholder?: string

  /**
   * @description パネルがドキュメントに追加される場所
   * @default 'document'
   */
  appendTo?: 'self' | 'body' | string | undefined | HTMLElement

  /**
   * @description 入力フィールドの要素ID
   */
  inputId?: string

  /**
   * @description 親要素の幅いっぱいに表示するかどうか
   */
  fluid?: boolean

  /**
   * @description aria-labelledby 属性
   */
  ariaLabelledby?: string

  /**
   * @description aria-label 属性
   */
  ariaLabel?: string
}

export type DatePickerMonthChangeEvent = PrimeVueDatePickerMonthChangeEvent
export type DatePickerYearChangeEvent = PrimeVueDatePickerYearChangeEvent
export type DatePickerBlurEvent = PrimeVueDatePickerBlurEvent

export interface DatePickerEmits {
  /**
   * @description 値が変更された時に発火
   */
  'update:modelValue': [value: undefined | null | Date | Date[] | (null | Date)[]]

  /**
   * @description 値が変更された時に発火
   */
  'value-change': [value: undefined | null | Date | Date[] | (null | Date)[]]

  /**
   * @description 入力フィールドが変更された時に発火
   */
  input: [event: Event]

  /**
   * @description 日付が選択された時に発火
   */
  'date-select': [value: Date]

  /**
   * @description パネルが表示された時に発火
   */
  show: []

  /**
   * @description パネルが非表示になった時に発火
   */
  hide: []

  /**
   * @description デートピッカーのハイライトが更新された時に発火
   */
  'today-click': []

  /**
   * @description クリアボタンがクリックされた時に発火
   */
  'clear-click': []

  /**
   * @description 月が変更された時に発火
   */
  'month-change': [event: DatePickerMonthChangeEvent]

  /**
   * @description 年が変更された時に発火
   */
  'year-change': [event: DatePickerYearChangeEvent]

  /**
   * @description 入力フィールドがフォーカスされた時に発火
   */
  focus: [event: Event]

  /**
   * @description 入力フィールドがブラーされた時に発火
   */
  blur: [event: DatePickerBlurEvent]

  /**
   * @description キーダウンイベントが発生した時に発火
   */
  keydown: [event: Event]
}
