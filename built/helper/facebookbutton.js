"use strict";
//Max of three buttons possible
/*
*generates a button for facebook
*/
module.exports = function (fullurl, title, msgtext) {
    if (title === void 0) { title = ''; }
    if (msgtext === void 0) { msgtext = "Click button to view " + title.toLowerCase(); }
    // console.log("msg: " + msgtext);
    return { 'fulfillmentMessages': [{
                "payload": {
                    "facebook": {
                        attachment: {
                            type: "template",
                            payload: {
                                template_type: "button",
                                text: msgtext,
                                buttons: [{
                                        type: "web_url",
                                        url: fullurl,
                                        title: title,
                                        webview_height_ratio: "full",
                                        messenger_extensions: true
                                    }]
                            }
                        }
                    }
                }
            }]
    };
};
//# sourceMappingURL=facebookbutton.js.map