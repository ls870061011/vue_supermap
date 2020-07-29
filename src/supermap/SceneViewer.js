/**
 * @module supermap/Viewer
 */

import Config from './Config';

/**
 * @classdesc
 * 场景视图类
 *
 * @api
 */
class SceneViewer extends Cesium.Viewer {
  /**
   *
   * @param {Object} options
   *
   * @constructor
   * @alias SceneView
   */
  constructor(options) {
    super(options);
    Config.viewer = this;
  }
}

export default SceneViewer;
