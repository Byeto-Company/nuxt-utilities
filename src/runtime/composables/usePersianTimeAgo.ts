import { ref, onMounted,onUnmounted } from '#imports'
import { formatDistance, toDate } from 'date-fns-jalali'
import { faIR } from 'date-fns-jalali/locale'

const usePersianTimeAgo = (date: Date) => {
  const timeAgo = ref('')

  const updateTimeAgo = () => {
    timeAgo.value = formatDistance(toDate(date), new Date(), {
      addSuffix: true,
      locale: faIR
    })
  }

  onMounted(() => {
    updateTimeAgo()

    const interval = setInterval(updateTimeAgo, 60000)

    onUnmounted(() => clearInterval(interval))
  })

  return timeAgo
}

export default usePersianTimeAgo
