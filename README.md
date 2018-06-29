# qs-mashup-openapp
Simple mashup to open an app from Qlik Sense server by its name rather than its id (browser redirects you)

![alt text](https://github.com/ChristofSchwarz/pics/raw/master/demo-qs-mashup-openapp.gif "Screenrec")

This serves the purpose when you know a title (name) of an app, or even the sheet-id of an app, but not the app id itself (for example the a new server has been installed, app id has changed, but you want a permanent link to work before as well as after)

* The mashup uses the QRS API /qrs/app to query available apps with the rights of the user. (this means different users may be redirected to different apps if the title is not unique)
* the text provided must be equal to, or a substring of, the app title.
* If only one app is returned, the browser redirects to that app (if not using option <b>&wait</b>). 
* In case the provided app name is not unique (for that user), all available apps will be shown in a list 
![alt text](https://github.com/ChristofSchwarz/pics/raw/master/qs-mashup-openapp.png "screenshot")
* If no app with given title is found then this error is shown
![alt text](https://github.com/ChristofSchwarz/pics/raw/master/qs-mashup-openapp-err.png "screenshot")
* More options are availale 
    * <b>&silent</b> supresses any screen output (html body set to display:none) while redirecting
    * option starting with '&/' (like &/sheet/sheetid/state/analysis) will be added to the redirect url (without "&"), so you can even pass a deep link to the target app



## When option get overruled
* <b>&silent</b> ... when no app can be found, an error is shown. 

## Syntax:
http(s)://&lt;serverurl&gt;/extensions/open/app.html?&lt;appname&gt;[&wait][&silent][&/more/rest/params]
http(s)://&lt;serverurl&gt;/&lt;virtualproxy&gt;/extensions/open/app.html?&lt;appname&gt;[&wait][&silent][&/more/rest/params]


## Examples
* https://qmi-qs-cln/test/extensions/open/app.html?My%20Geo&silent&/sheet/k85f5/language/en looks for app "My&nbsp;Geo"
* if unique it goes to
https://qmi-qs-cln/test/sense/app/8f95d5ef-7db4-423e-a2be-0396754bf7d4/sheet/k85f5/language/en 
