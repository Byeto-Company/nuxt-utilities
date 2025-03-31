import { ref, watch, useRefHistory } from '#imports'
import type { Ref } from '#imports'

const useObjectTrack = (object: Ref) => {
  // state

  const isNotEqual = ref(false)

  const { history, reset, clear } = useRefHistory(object, {
    deep: true
  })

  // watch

  watch(
    () => history.value,
    (newHistory) => {
      if (newHistory.length < 2) {
        isNotEqual.value = false
        return
      }

      const initial = newHistory[0].snapshot
      const current = newHistory[newHistory.length - 1].snapshot

      const hasChanges = Object.keys(initial).some(
        (key) =>
          JSON.stringify(current[key]) !==
          JSON.stringify(initial[key])
      )

      isNotEqual.value = hasChanges
    },
    { deep: true }
  )

  return {
    isNotEqual,
    reset,
    clear
  }
}

export default useObjectTrack
