import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import feedItBackApi from './util/api'
import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'
import dayjs from 'dayjs'

const app = createApp(App)

app.use(router)
app.component('DatePicker', Datepicker)

app.config.globalProperties.feedItBackApi = feedItBackApi
app.config.globalProperties.$filters = {
  currency: value => {
    if (!value) return ''
    if (isNaN(value)) return value
    return `£${value
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  },
  formatDate: date => {
    if (!date) return ''
    return dayjs(date).format('DD-MM-YYYY')
  }
}
app.mount('#app')
