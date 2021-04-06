// this code gets called when the new mail Button in Compose Window is pressed

messenger.tabs.query({
    active: true,
    currentWindow: true,
})
    .then(tabs => {
        const tabId = tabs[0].id;

		//do something before sending the mail - for example modify the ComposeDetails:

        details = {
            bcc: "test@example.com"
        }
        console.log("messenger.compose.setComposeDetails - tabId, details:", tabId, details)
        messenger.compose.setComposeDetails(tabId, details) // [Added in TB 74]
            .then(response => {

                messenger.windows.getCurrent() //Returns a Promise fulfilled with:  Window //windowTypes deprecated in TB78 { windowTypes: ['messageCompose'] }
                    .then(window => {
                        console.log("messenger.windows.getCurrent() response:", response);

                        if (window.type == "messageCompose") {

							//send the composed email
                            messenger.sendmail.SendComposedEmail(window.id);

                        } else {
                            console.error("messenger.windows.getCurrent() wrong windowType:", window);
                        }

                    })
                    .catch(error => {
                        console.error("messenger.windows.getCurrent() failed:", error);
                    });

            })
            .catch(error => {
                console.error("messenger.compose.setComposeDetails() failed:", error);
            });
    })
    .catch(error => {
        console.error("messenger.tabs.query() failed:", error);
    });
