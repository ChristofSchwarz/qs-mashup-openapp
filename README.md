# qs-mashup-openapp
Simple mashup to open an app from Qlik Sense server by its name rather than its id (browser redirects you)

![alt text](https://github.com/ChristofSchwarz/pics/raw/master/demo-open-app-mashup.gif "Screenrec")

This serves the purpose when you know a title (name) of an app but not the app id itself (for example the a new server has been installed, app id has changed, but you want a permanent link to work before as well as after)

* The mashup uses the QRS API /qrs/app to query available apps with the rights of the user. (this means different users may be redirected to different apps if the title is not unique)
* the text provided must be equal to, or a substring of, the app title.
* If only one app is returned, the browser redirects to that app (if not using option <b>&wait</b>). 
* In case the provided app name is not unique (for that user), all available apps will be shown in a list 
![](https://github.com/ChristofSchwarz/pics/raw/master/2018-06-29%2015_18_20-Qlik%20Sense%20Mashup.png "screenshot")
* If no app with given title is found then this error is shown
![alt text](https://github.com/ChristofSchwarz/pics/raw/master/qs-mashup-openapp-err.png "screenshot")

# Query String Options 
* <b>&wait</b> prevents the automatic redirect of the browser
* <b>&silent</b> supresses any screen output (html body set to display:none) while redirecting
* <b>&published</b> searches only within Apps published in Streams (this can help to make an App name unique)
* <b>&private</b> or <b>&personal</b> searches only in unpublished Apps (Personal Work)
* option starting with '&/' (like &/sheet/sheetid/state/analysis) will be added to the redirect url (without "&"), so you can even pass a deep link to the target app

### When options get overruled
* <b>&silent</b> ... when no app can be found, an error is shown regardless of adding &silent (no redirect)
* <b>&silent&wait</b> ... both options lead to ignore &silent (waiting on an empty screen makes no sense)
* <b>&published&private</b> ... both options in combination lead to no app being shown

## Syntax:
http(s)://&lt;serverurl&gt;/extensions/open/app.html?&lt;appname&gt;[&option][&/rest/params]
http(s)://&lt;serverurl&gt;/&lt;virtualproxy&gt;/extensions/open/app.html?&lt;appname&gt;[&option][&/rest/params]


## Examples
* https://qmi-qs-cln/test/extensions/open/app.html?My%20Geo&silent&/sheet/k85f5/language/en looks for app "My&nbsp;Geo"
* if unique it goes to
https://qmi-qs-cln/test/sense/app/8f95d5ef-7db4-423e-a2be-0396754bf7d4/sheet/k85f5/language/en 
