"use strict";
//https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic/#carousel
module.exports = function (titles, urls, image_urls) {
    function makeTemplates(title, url, image_url) {
        return {
            "title": title,
            "image_url": image_url,
            "default_action": {
                "type": "web_url",
                "url": url,
                "webview_height_ratio": "full",
                "messenger_extensions": "true"
            }
        };
    }
    var templatelist = [];
    titles.forEach(function (title, index) {
        templatelist.push(makeTemplates(title, urls[index], image_urls[index]));
    });
    return { 'fulfillmentMessages': [{
                "payload": {
                    "facebook": {
                        "attachment": {
                            "type": "template",
                            "payload": {
                                "template_type": "generic",
                                "image_aspect_ratio": "square",
                                "elements": templatelist
                            }
                        }
                    }
                }
            }]
    };
};
//# sourceMappingURL=facebookcarousel.js.map