<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { watch, onMounted } from 'vue'
import { useTheme } from 'vuetify'

const isDark = usePreferredDark()
const theme = useTheme()

// Function to apply the theme
const applyTheme = (value: boolean) => {
  console.log('Applying theme. isDark:', value)
  theme.global.name.value = value ? 'dark' : 'light'
}

// Watch for changes in isDark
watch(isDark, (value) => {
  applyTheme(value)
})

// Apply theme on mounted
onMounted(() => {
  applyTheme(isDark.value)
})
</script>
