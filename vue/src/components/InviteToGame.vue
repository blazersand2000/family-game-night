<template>
  <v-card
    :append-icon="mdiShareVariant"
    class="mx-auto"
    max-width="300"
    :prepend-icon="mdiAccountPlus"
    subtitle="Share the game link"
    title="Invite To Game"
    @click="handleClick"
  ></v-card>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import { mdiAccountPlus, mdiShareVariant } from '@mdi/js'
import { useShare, type UseShareOptions } from '@vueuse/core'
import { useRouter } from 'vue-router'

const props = defineProps<{
  inviterName: string
  gameLobbyId: string
}>()

const router = useRouter()
const { share, isSupported } = useShare()

const gameUrl = computed(
  () =>
    router.resolve({
      name: 'gameLobby',
      params: { gameLobbyId: props.gameLobbyId }
    }).href
)

const shareText = computed(() => `${props.inviterName} is inviting you to play!`)
const shareOptions = ref<UseShareOptions>({
  title: 'Family Game Night',
  text: shareText.value,
  url: gameUrl.value
})

const shareFailed = ref(false)
const canUseNativeShare = computed(() => isSupported.value && !shareFailed.value)

const handleClick = () => {
  return share(shareOptions.value).catch(() => {
    shareFailed.value = true
  })
}
</script>
