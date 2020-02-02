<template>
  <span>
    {{ temperatureUpdatedDate }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    temperatureUpdatedDate() {
      const toDoubleNum = (num) => {
        if (num.toString().length === 1) {
          return `0${num}`
        }

        return num
      }

      const d = new Date(this.date)
      const y = toDoubleNum(d.getFullYear())
      const m = toDoubleNum(d.getMonth() + 1)
      const dd = toDoubleNum(d.getDate())
      const h = toDoubleNum(d.getHours())
      const min = toDoubleNum(d.getMinutes())

      return `${dd}.${m}.${y} ${h}:${min}`
    }
  }
}
</script>
