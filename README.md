# Flight Watchdog Client

The *Flight Watchdog Client* is frontend part built on the [Flight Watchdog API](https://cee-systems.gitbook.io/flight-watchdog-api/)  and designated for the online booking tool [GOL IBE](https://www.cee-systems.com/gol-ibe). 

The Flight Watchdog is a tool for daily flight price tracking. The flight tracking is defined by origin and destination, and a price limit. It sends you a notification, if it finds a lower price than defined.

## Requirements

* Node (>10)

## Prepare development environment

Authenticating to GitHub Packages
see [there](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)

Clone project
```bash
> git clone git@github.com:Travelport-Czech/flight-watchdog-client.git
```
Install dependencies
```bash
> npm install
```
Run tests
```bash
> npm run test
```

## Create Own Watchdog Client 

You can create the own modification of the Client. If you choose, follow next procedure.

### Prepare
1. Fork this repository
1. Prepare the development environment of your fork
1. Check consistency of the project
    * Run tests: `npm run test`
1. Create the initial commit
    * Rename the package in package.json (`name` attribute)
    * Commit and push this change 
### Modification procedure
1. Edit the source code
1. Debug changes with
    * `npm run open` to view window in all steps
    * `npm run test-open` to run tests separately
1. Run tests: `npm run test`
1. (optional) Add or modify tests to folder `cypress/integration`
1. Run `npm run autofix`
1. Commit and push this changes

### Release
1. Change the version number in in package.json (`version` attribute)
1. Create a new tag (version number) on repository (on GitHub create a release)
1. Notify CEE Travelport with the version number to release

## Translations

* Generate the excel table to the file `translations.xlsx`:
```
> npm run lang-export
``` 
* Do modifications in the file `translations.xlsx`
* Apply modifications with:
```
> npm run lang-import
```
* Commit and push changes to the git

## Client script for frontend

```javascript
var flightWatchdogClientMobileCheck = function() {
   var check = false;
   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
   return check;
};

var startFlightWatchdogClient = function () {
   if (!flightWatchdogClientMobileCheck()) {
      var font = document.createElement('link');
      font.href = 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap'
      font.rel = 'stylesheet'
      document.getElementsByTagName('head')[0].appendChild(font);
      var s = document.createElement('script');
      s.src = 'https://flight-watchdog-client.cee-systems.com/index-d4.js';
      s.onload = function() {
         if (!initFlightWatchdogClient) {
            return;
         }
         var settings = {
            token: 'c0g6CYPK5JRnJmWdF9mvWWH3k6Mn2HkPLfs0QnppcSpJ4O1Y4E'
         };
         initFlightWatchdogClient(settings);
      };
      document.getElementsByTagName('head')[0].appendChild(s);
   }
}

var started = 0;
var flightWatchdogButationObserver = new MutationObserver(function(mutations) {
   mutations.forEach(function(mutation) {
      if (document.querySelector('.flight-prices-links-price')) {
         if (started) {
            return
         }
         started = 1
         startFlightWatchdogClient()
      }
   });
});
if (!flightWatchdogClientMobileCheck()) {
   flightWatchdogButationObserver.observe(document.getElementsByTagName('body')[0], {
      childList: true,
      subtree: true
   });
}



```

## Version release workflow

Version is automatically changed if the master branch is changed

* Based on the commit messages, increment the version from the lastest release.
If the string "BREAKING CHANGE" is found anywhere in any of the commit messages or descriptions the major version will be incremented.
* If a commit message begins with the string "feat" then the minor version will be increased. This works for most common commit metadata for feature additions: "feat: new API" and "feature: new API".
* All other changes will increment the patch version.
