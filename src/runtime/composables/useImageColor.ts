import type { FastAverageColorResult } from 'fast-average-color'
import { FastAverageColor } from 'fast-average-color'
import { onMounted, ref } from '#imports'

const useImageColor = (img: string) => {
  const fac = new FastAverageColor()
  const colorObject = ref<FastAverageColorResult>()
  const isPending = ref(false)

  const extractImageColor = async () => {
    isPending.value = true

    const imageEl = document.querySelector(img) as HTMLImageElement

    try {
      const color = await fac.getColorAsync(imageEl)
      isPending.value = false
      colorObject.value = color
    } catch (e) {
      console.log(e)
      isPending.value = false
    }
  }

  onMounted(async () => {
    await extractImageColor()
  })

  return {
    colorObject,
    extractImageColor,
    isPending
  }
}

export default useImageColor
