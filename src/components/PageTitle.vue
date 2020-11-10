<template>
  <div class="d-flex py-2">
    <h3 class="text-primary" >{{ title }}</h3>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class PageTitleComponent extends Vue {
    @Prop() readonly title!: string
}
</script>