import { defineNuxtModule, createResolver, addImportsDir, installModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-utils',
    configKey: 'nuxtUtils'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {

    const resolver = createResolver(import.meta.url)

    await installModule('@vueuse/nuxt')

    addImportsDir(resolver.resolve('runtime/composables'))
  }
})
