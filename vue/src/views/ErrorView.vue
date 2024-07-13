<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="not-found-card">
          <v-card-title class="not-found-title">{{ props.title }}</v-card-title>
          <v-card-text class="not-found-text"> {{ props.text }} </v-card-text>
          <!-- <v-card-title class="not-found-title">404 - Game Not Found</v-card-title>
          <v-card-text class="not-found-text"> Oops! There's no game here. </v-card-text> -->
          <v-card-actions>
            <v-btn color="primary" to="/">Go Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { ErrorViewProps } from '@/types/errorViewProps'

const props = defineProps<ErrorViewProps>()
</script>
