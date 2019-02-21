/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `TestController.customUrl()`
   */
  customUrl: async function (req, res) {
    return res.json({
      todo: 'customUrl() is not implemented yet!'
    });
  }

};

