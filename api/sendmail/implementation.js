
var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");


var sendmail = class extends ExtensionCommon.ExtensionAPI {
    getAPI(context) {
        return {
            sendmail: {
                SendComposedEmail: function (windowId) {
                    // Get a real window from a window ID:
                    var windowObject = context.extension.windowManager.get(windowId);
                    var realWindow = windowObject.window;

                    realWindow.goDoCommand("cmd_sendButton");
                },
            }
        }
    }
}

