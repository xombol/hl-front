<template>
  <div>
    <router-link v-if="!isTableRoute" to="/table-view">Перейти к таблице</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const isTableRoute = computed(() => route.path === '/table-view');

    return { isTableRoute };
  }
};
</script>
