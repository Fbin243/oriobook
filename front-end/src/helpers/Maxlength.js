var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      if (window.CP.shouldStopExecution(1)) {
        break;
      }
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
    window.CP.exitedLoop(1);
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Maxlength = (function () {
  function Maxlength(selector) {
    var _this = this;
    _classCallCheck(this, Maxlength);
    $(selector)
      .keyup(function (e) {
        return _this.handler(e);
      })
      .keydown(function (e) {
        return _this.handler(e);
      })
      .focus(function (e) {
        return _this.handler(e);
      })
      .focusout(function (e) {
        $("div.--maxlength").css("display", "none");
      });
  }
  _createClass(Maxlength, [
    {
      key: "handler",
      value: function handler(e) {
        var max = $(e.target).attr("maxlength");
        var current = $(e.target).val().length;
        var top = $(e.target).position().top + $(e.target).outerHeight(true);
        var left = $(e.target).position().left + $(e.target).width() / 2.5;
        if ($("div.--maxlength").length == 0)
          $("body").append('<div class="--maxlength"></div>');
        $("div.--maxlength").css("display", "block");
        $("div.--maxlength").text(current + " / " + max);
        $("div.--maxlength").css("top", top);
        $("div.--maxlength").css("left", left);
      },
    },
  ]);
  return Maxlength;
})();

module.exports = {
  Maxlength,
}