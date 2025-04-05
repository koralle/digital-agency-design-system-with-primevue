interface UseCharacterCounterProps {
  text: string | null
  segmenter?: Intl.Segmenter
}

export const useCharacterCounter = ({
  text,
  segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' }),
}: UseCharacterCounterProps) => {
  if (!text) return 0
  return Array.from(segmenter.segment(text)).length
}
