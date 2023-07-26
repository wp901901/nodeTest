<template>
    <div id="tags-view-container" class="tags-view-container">
        321
        <!-- <router-link to="path"></router-link> -->
    </div>
</template>
<!-- https://blog.csdn.net/qq_16525829/article/details/126805881 -->
<script lang="ts" setup>
import { tagView } from "@/store/tagsView";
const tagsViewModule = tagView();
console.log('tagsViewModule', tagsViewModule.visitedViewsGetter);

</script>


<style lang="scss" scoped></style>