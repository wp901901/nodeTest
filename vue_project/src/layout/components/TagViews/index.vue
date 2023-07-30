<!-- 路由历史组件 -->
<template>
    <div id="tags-view-container" class="tags-view-container">
        <!-- :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" -->

        <router-link
            v-for="(tag,idx) in tagsViewModule.visitedViews"
            ref="tag"
            :key="tag.path"
            :class="isActive(tag)?'active':''"
            :to="{ path: tag.path, query: tag.query }"
            tag="span"
            class="tags-view-item"
        >
            {{ tag.meta.title }}
            <el-icon v-if="!isActive(tag)" @click.prevent.stop="closeSelectedTag(idx)"><Close /></el-icon>
        </router-link>
    </div>
</template>
<!-- https://blog.csdn.net/qq_16525829/article/details/126805881 -->
<script lang="ts" setup>
import {useRoute,RouteRecordRaw} from 'vue-router';
import { tagView } from "@/store/tagsView";

const tagsViewModule:any = tagView();
const route = useRoute();

const isActive = (tag:RouteRecordRaw)=>{
    return tag.path === route.path
}

const closeSelectedTag = (idx:number)=>{
    tagsViewModule.delVisitedView(idx);
}

</script>


<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
//   .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
//   }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>