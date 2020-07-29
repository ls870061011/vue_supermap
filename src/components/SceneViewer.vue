<template>
  <div id="sceneViewer" class="scene-viewer"></div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import Viewer from '../supermap/SceneViewer';

@Component
export default class SceneViewer extends Vue {
  cesiumPath = process.env.SUPERMAP_BASE_URL;

  // eslint-disable-next-line class-methods-use-this
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const viewer = new Viewer('sceneViewer');
  }

  getCesiumScript() {
    const $link = document.createElement('link');
    $link.rel = 'stylesheet';
    document.head.appendChild($link);
    $link.href = `${this.cesiumPath}/Cesium/Widgets/widgets.css`;

    const $script = document.createElement('script');
    document.body.appendChild($script);
    $script.src = `${this.cesiumPath}/Cesium/Cesium.js`;

    return new Promise((resolve) => {
      $script.onload = () => {
        resolve();
      };
    });
  }
}
</script>

<style scoped lang="scss">
.scene-viewer {
  height: 100%;
}
</style>
