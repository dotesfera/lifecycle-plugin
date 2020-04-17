/*!
* rete-lifecycle-plugin v1.0.0-beta.1 
* (c) 2020 Vitaliy Stoliarov 
* Released under the MIT license.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getHook(editor, name, method) {
  if (!name) return function () {
    return null;
  };
  var component = editor.getComponent(name);

  if (method in component) {
    var c = component;
    return c[method];
  }

  return function () {
    return null;
  };
}

function install(editor) {
  editor.on("nodecreated", function (node) {
    return getHook(editor, node.name, "created")(node);
  });
  editor.on("noderemoved", function (node) {
    return getHook(editor, node.name, "destroyed")(node);
  });
  editor.on("connectioncreate", function (_ref) {
    var _input$node, _output$node;

    var input = _ref.input,
        output = _ref.output;
    if (getHook(editor, (_input$node = input.node) === null || _input$node === void 0 ? void 0 : _input$node.name, "onconnect")(input) === false || getHook(editor, (_output$node = output.node) === null || _output$node === void 0 ? void 0 : _output$node.name, "onconnect")(output) === false) return false;
  });
  editor.on("connectioncreated", function (connection) {
    var _connection$input$nod, _connection$output$no;

    getHook(editor, (_connection$input$nod = connection.input.node) === null || _connection$input$nod === void 0 ? void 0 : _connection$input$nod.name, "connected")(connection);
    getHook(editor, (_connection$output$no = connection.output.node) === null || _connection$output$no === void 0 ? void 0 : _connection$output$no.name, "connected")(connection);
  });
  editor.on("connectionremove", function (connection) {
    var _connection$input$nod2, _connection$output$no2;

    if (getHook(editor, (_connection$input$nod2 = connection.input.node) === null || _connection$input$nod2 === void 0 ? void 0 : _connection$input$nod2.name, "ondisconnect")(connection) === false || getHook(editor, (_connection$output$no2 = connection.output.node) === null || _connection$output$no2 === void 0 ? void 0 : _connection$output$no2.name, "ondisconnect")(connection) === false) return false;
  });
  editor.on("connectionremoved", function (connection) {
    var _connection$input$nod3, _connection$output$no3;

    getHook(editor, (_connection$input$nod3 = connection.input.node) === null || _connection$input$nod3 === void 0 ? void 0 : _connection$input$nod3.name, "disconnected")(connection);
    getHook(editor, (_connection$output$no3 = connection.output.node) === null || _connection$output$no3 === void 0 ? void 0 : _connection$output$no3.name, "disconnected")(connection);
  }); // Dotesfera Added

  editor.on("nodeselected", function (node) {
    return getHook(editor, node.name, "onselected")(node);
  });
}
var index = {
  name: "lifecycle",
  install: install
};

exports.default = index;
//# sourceMappingURL=lifecycle-plugin.common.js.map
