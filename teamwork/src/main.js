import { createApp } from 'vue'
import App from './App.vue'

import mitt from 'mitt'
const emitter = mitt()

import router from './router'
import dayjs from 'dayjs'

const app = createApp(App)

app.use(router)
app.config.globalProperties.emitter = emitter
app.config.globalProperties.$filters = {
  formatDate: date => {
    if (!date) return ''
    return dayjs(date).format('DD/MM/YYYY')
  },
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  getHomeworldId: url => {
    if (!url) return ''
    return url.split('/').pop()
  }
}
app.mount('#app')
