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
import type { GameType } from 'shared/models/gameType'

const props = defineProps<{
  gameType: GameType
  gameId: string
}>()

const router = useRouter()
const { share, isSupported } = useShare()

const shareText = computed(() => `Join me for a fun game of ${props.gameType}!`)

const gameUrl = computed(
  () =>
    router.resolve({
      name: 'game',
      params: { gameId: props.gameId }
    }).href
)

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
