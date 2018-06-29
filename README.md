# qs-mashup-openapp
Simple mashup to open an app from Qlik Sense server by its name rather than its id (browser redirects you)

This serves the purpose when you know a title (name) of an app, or even the sheet-id of an app, but not the app id itself (for example the a new server has been installed, app id has changed, but you want a permanent link to work before as well as after)

* The mashup uses the QRS API /qrs/app to query available apps with the rights of the user. (this means different users may be redirected to different apps if the title is not unique)
* If only one app is returned, the browser redirects to that app. 
* More options are availale to do that silently, or to bypass redirect even when there is exactly one app found (=wait)
* any more options starting with '/' (like /sheet/sheetid/state/analysis) will be added to the redirect url, so you can even pass a deep link to the target app

In case that the title is not unique a list of available apps will be shown

![alt text](https://github.com/ChristofSchwarz/qs-mashup-openapp/raw/master/demo.gif "Screenrec")

## Syntax:
http(s)://&lt;serverurl&gt;/extensions/open/app.html?&lt;appname&gt;[&wait][&ilent][/more/rest/params]
http(s)://&lt;serverurl&gt;/&lt;virtualproxy&gt;/extensions/open/app.html?&lt;appname&gt;[&wait][&silent][/more/rest/params]


## options:
* &wait ... in case there is only one app found, browser is NOT redirected with this option (option is irrelevant if multiple apps are found)
* &silent ... no text will be shown while JavaScript is working. Option is ignored, when no app can be found (error is shown)

Eexamples
* https://qmi-qs-cln/test/extensions/open/app.html?My%20Geo&silent&/sheet/430059b8-85f5-4470-9e30-6a83c89625c2/language/en 
* goes to
https://qmi-qs-cln/test/sense/app/8f95d5ef-7db4-423e-a2be-0396754bf7d4/sheet/430059b8-85f5-4470-9e30-6a83c89625c2/language/en 
