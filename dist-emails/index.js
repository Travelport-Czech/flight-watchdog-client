/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const AppLogicError_1 = __webpack_require__(13);

const csTranslation_1 = __webpack_require__(15);

const enTranslation_1 = __webpack_require__(16);

const SupportedLanguageEnum_1 = __webpack_require__(17);

const moment = __webpack_require__(18);

const React = __webpack_require__(0);

let language;
const momentTransformTable = {
  [SupportedLanguageEnum_1.SupportedLanguageEnum.cs]: 'cs',
  [SupportedLanguageEnum_1.SupportedLanguageEnum.en]: 'en-GB'
};

const getTranslationTable = () => {
  if (!language) {
    throw new AppLogicError_1.AppLogicError('Language not defined.');
  }

  if (language.toString() === SupportedLanguageEnum_1.SupportedLanguageEnum.cs) {
    return csTranslation_1.csTranslation;
  }

  if (language.toString() === SupportedLanguageEnum_1.SupportedLanguageEnum.en) {
    return enTranslation_1.enTranslation;
  }

  throw new AppLogicError_1.AppLogicError('Language not supported.');
};

exports.initializeTranslator = changeLanguage => {
  language = changeLanguage;
  const lang = momentTransformTable[language.toString()];

  if (typeof lang !== 'string') {
    throw new AppLogicError_1.AppLogicError('Language not supported.');
  }

  moment.locale(lang);
};

exports.getLanguage = () => {
  if (!language) {
    throw new AppLogicError_1.AppLogicError('Language not defined.');
  }

  return language;
};

exports.translate = (name, params = []) => {
  if (!language) {
    throw new AppLogicError_1.AppLogicError('Language not defined.');
  }

  const table = getTranslationTable();

  if (!table.hasOwnProperty(name)) {
    throw new AppLogicError_1.AppLogicError('Missing translation key ' + name + ' for language ' + language.toString());
  }

  const template = table[name];
  const parts = template.split('{?}');

  if (parts.length - 1 !== params.length) {
    throw new AppLogicError_1.AppLogicError('Text component must have ' + (parts.length - 1).toString() + ' (now have ' + params.length.toString() + ') children for template (' + name.toString() + "): '" + template + "'");
  }

  return parts.reduce((acc, current, index) => {
    return acc + current.replace('{_}', '\u00a0') + params[index];
  });
};

class Text extends React.Component {
  render() {
    if (!language) {
      throw new AppLogicError_1.AppLogicError('Language not defined.');
    }

    const key = this.props.name;
    const table = getTranslationTable();

    if (!table.hasOwnProperty(key)) {
      throw new AppLogicError_1.AppLogicError('Missing translation key ' + key + ' for language ' + language.toString());
    }

    const template = table[key];
    const parts = template.split('{?}');
    const children = React.Children.toArray(this.props.children);

    if (parts.length - 1 !== children.length) {
      throw new AppLogicError_1.AppLogicError('Text component must have ' + (parts.length - 1).toString() + ' (now have ' + children.length.toString() + ') children for template (' + key.toString() + "): '" + template + "'");
    }

    const result = parts.reduce((acc, current, index) => {
      acc.push(React.createElement(React.Fragment, {
        key: index
      }, current.replace('{_}', '\u00a0'), children[index]));
      return acc;
    }, []);
    return React.createElement(React.Fragment, null, result);
  }

}

exports.Text = Text;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TranslationEnum;

(function (TranslationEnum) {
  TranslationEnum["FormatDate"] = "FormatDate";
  TranslationEnum["FormatDateDayMonth"] = "FormatDateDayMonth";
  TranslationEnum["FormatDateWithDayName"] = "FormatDateWithDayName";
  TranslationEnum["ClientButtonCreate"] = "ClientButtonCreate";
  TranslationEnum["ClientButtonNotInterested"] = "ClientButtonNotInterested";
  TranslationEnum["ClientButtonOk"] = "ClientButtonOk";
  TranslationEnum["ClientButtonYes"] = "ClientButtonYes";
  TranslationEnum["ClientButtonClose"] = "ClientButtonClose";
  TranslationEnum["ClientBadEmailError"] = "ClientBadEmailError";
  TranslationEnum["ClientMessageCreateWatcherDone"] = "ClientMessageCreateWatcherDone";
  TranslationEnum["ClientMessageCreateWatcherWorking"] = "ClientMessageCreateWatcherWorking";
  TranslationEnum["ClientMessageDeleteWatcherWorking"] = "ClientMessageDeleteWatcherWorking";
  TranslationEnum["ClientMessageError"] = "ClientMessageError";
  TranslationEnum["ClientMessageContinueWatching"] = "ClientMessageContinueWatching";
  TranslationEnum["ClientMessageWatcherAlreadyExists"] = "ClientMessageWatcherAlreadyExists";
  TranslationEnum["ClientMessageWatcherDeleteById"] = "ClientMessageWatcherDeleteById";
  TranslationEnum["ClientMessageMoreWatchersAlreadyExists"] = "ClientMessageMoreWatchersAlreadyExists";
  TranslationEnum["ClientMessageMinimalizedWindow"] = "ClientMessageMinimalizedWindow";
  TranslationEnum["ClientInputEmailPlaceholder"] = "ClientInputEmailPlaceholder";
  TranslationEnum["ClientTitle"] = "ClientTitle";
  TranslationEnum["ClientDescription"] = "ClientDescription";
  TranslationEnum["ClientDestinationsReturn"] = "ClientDestinationsReturn";
  TranslationEnum["ClientDestinationsOneway"] = "ClientDestinationsOneway";
  TranslationEnum["ClientDatesReturn"] = "ClientDatesReturn";
  TranslationEnum["ClientDatesOneway"] = "ClientDatesOneway";
  TranslationEnum["EmailTitle"] = "EmailTitle";
  TranslationEnum["EmailLowerPriceSubject"] = "EmailLowerPriceSubject";
  TranslationEnum["EmailDescription"] = "EmailDescription";
  TranslationEnum["EmailContentDescription"] = "EmailContentDescription";
  TranslationEnum["EmailPricePrefixText"] = "EmailPricePrefixText";
  TranslationEnum["EmailPriceSuffixText"] = "EmailPriceSuffixText";
  TranslationEnum["EmailPrice"] = "EmailPrice";
  TranslationEnum["EmailPriceLimit"] = "EmailPriceLimit";
  TranslationEnum["EmailButtonShowResultPrefixText"] = "EmailButtonShowResultPrefixText";
  TranslationEnum["EmailButtonShowResult"] = "EmailButtonShowResult";
  TranslationEnum["EmailButtonContinueWatchingPrefixText"] = "EmailButtonContinueWatchingPrefixText";
  TranslationEnum["EmailButtonContinueWatching"] = "EmailButtonContinueWatching";
  TranslationEnum["EmailButtonDelete"] = "EmailButtonDelete";
  TranslationEnum["EmailFooter"] = "EmailFooter";
  TranslationEnum["EmailWatcherListHeader"] = "EmailWatcherListHeader";
  TranslationEnum["EmailWatcherListDescription"] = "EmailWatcherListDescription";
  TranslationEnum["EmailMarketingHeader"] = "EmailMarketingHeader";
  TranslationEnum["EmailMarketingDescription"] = "EmailMarketingDescription";
  TranslationEnum["EmailNoReplyName"] = "EmailNoReplyName";
  TranslationEnum["GraphLegendPriceLimit"] = "GraphLegendPriceLimit";
  TranslationEnum["GraphLegendPriceTrend"] = "GraphLegendPriceTrend";
})(TranslationEnum = exports.TranslationEnum || (exports.TranslationEnum = {}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const lowerPriceEmailFactory_1 = __webpack_require__(10);

const Text_1 = __webpack_require__(1);

exports.sendLowerPriceEmail = async (sendEmail, createImage, watcherFullInfo, price, emailFrom) => {
  Text_1.initializeTranslator(watcherFullInfo.watcher.lang);
  const emailContent = await lowerPriceEmailFactory_1.createLowerPriceEmailRaw(createImage, watcherFullInfo, price, emailFrom);
  await sendEmail(emailContent);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
const primaryTextColor = '#333';
const secondaryTextColor = '#666';
const secondaryBackgroundColor = 'rgb(249, 249, 249)';
const bellImageBackground = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI2NHB4IiBpZD0iU1ZHUm9vdCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI2NHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcyBpZD0iZGVmczM4NDgiLz48ZyBpZD0ibGF5ZXIxIj48ZyBpZD0iZzUyMDEiIHN0eWxlPSJzdHJva2U6IzAwMDAwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQsLTIxLjI1KSI+PHBhdGggY2xhc3M9ImZpbDAgc3RyMCIgZD0iTSAtMjguNTMxNDU5LDUxLjQyNjA2MSBWIDY3LjQ1NzUyIEggLTEyLjUgMy41MzE0NTg5IFYgNTEuNDI2MDYxIGMgMCwtOC44MzE3MDIgLTcuMTk5NzU3LC0xNi4wMzE0NTkgLTE2LjAzMTQ1ODksLTE2LjAzMTQ1OSB2IDAgYyAtOC44MzE3MDIsMCAtMTYuMDMxNDU5LDcuMTk5NzU3IC0xNi4wMzE0NTksMTYuMDMxNDU5IHoiIGlkPSJwYXRoMjciIHN0eWxlPSJjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOm5vbmU7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjIuMDAwMDU0MTI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO2ltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7c2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb24iLz48cGF0aCBjbGFzcz0iZmlsMCBzdHIwIiBkPSJtIC0xMy4yNjc5NzQsNDAuNzcwNDIxIHYgMCBjIC01LjE4MzgyNSwwIC05LjMxMTY4Niw0LjIyMzg1NyAtOS4zMTE2ODYsOS4zMTE2ODUiIGlkPSJwYXRoMjkiIHN0eWxlPSJjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOm5vbmU7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjIuMDAwMDU0MTI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO2ltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7c2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjt0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb24iLz48cGF0aCBjbGFzcz0iZmlsMCBzdHIxIiBkPSJtIC0xMi42OTE5OTQsNDMuNjUwMzIzIHYgMCBtIC0zLjU1MTg4LC03Ljg3MTczNCB2IC0yLjg3OTkwMiBjIDAsLTIuMDE1OTMyIDEuNjMxOTQ1LC0zLjU1MTg4IDMuNTUxODgsLTMuNTUxODggdiAwIGMgMi4wMTU5MzIsMCAzLjU1MTg4MDksMS42MzE5NDQgMy41NTE4ODA5LDMuNTUxODggdiAyLjg3OTkwMiIgaWQ9InBhdGgzMSIgc3R5bGU9ImNsaXAtcnVsZTpldmVub2RkO2ZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6Mi4wMDAwNTQxMjtpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5O3NoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247dGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uIi8+PHBhdGggY2xhc3M9ImZpbDAgc3RyMCIgZD0ibSAtNC42MjgyNjYxLDcxLjc3NzM3NCBjIC0xLjI0Nzk1OCwzLjE2Nzg5MyAtNC4zMTk4NTQsNS4zNzU4MTkgLTcuODcxNzMzOSw1LjM3NTgxOSAtMy41NTE4OCwwIC02LjcxOTc3MywtMi4xMTE5MjkgLTcuODcxNzM0LC01LjI3OTgyMiIgaWQ9InBhdGgzMyIgc3R5bGU9ImNsaXAtcnVsZTpldmVub2RkO2ZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6Mi4wMDAwNTQxMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7aW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTtzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uO3RleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbiIvPjwvZz48L2c+PC9zdmc+)';
exports.primaryColor = {
  color: primaryTextColor
};
exports.secondaryColor = {
  color: secondaryTextColor
};
exports.secondaryBackground = {
  backgroundColor: secondaryBackgroundColor
};
exports.chatBox = _objectSpread({}, exports.primaryColor, {
  backgroundColor: 'white',
  border: '0px solid #eee',
  borderBottom: 'none',
  bottom: '0',
  boxShadow: '0px 0px 5px rgba(0,0,0,.3)',
  font: "normal normal 11px 'Roboto',sans-serif",
  position: 'fixed',
  right: '10px',
  textAlign: 'center',
  width: '400px',
  zIndex: 9999
});
exports.checkBoxInput = {
  cursor: 'pointer',
  display: 'block',
  filter: 'alpha(opacity=0)',
  height: '26px',
  left: '0',
  margin: '0 0',
  opacity: 0,
  padding: '0 0',
  position: 'absolute',
  right: '0',
  top: '0',
  width: '100%',
  zIndex: 4
};
exports.label = _objectSpread({}, exports.primaryColor, {
  backgroundColor: '#f9f9f9',
  border: '1px solid #aaa',
  display: 'block',
  fontSize: '13px',
  fontWeight: 'bold',
  height: '24px',
  lineHeight: '26px',
  padding: '0 1em 1px'
});
exports.content = {
  backgroundColor: '#f9f9f9',
  boxShadow: 'inset 0px 11px 8px -10px #CCC',
  height: '120px',
  padding: '20px',
  textAlign: 'left'
};
exports.icon = {
  background: bellImageBackground,
  backgroundSize: '20px 20px',
  display: 'block',
  height: '20px',
  left: '12px',
  position: 'absolute',
  top: '4px',
  width: '20px'
};

const defaultInputItem = _objectSpread({}, exports.primaryColor, {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '13px',
  margin: '0px',
  padding: '10px'
});

exports.input = _objectSpread({}, defaultInputItem, {
  marginRight: '5px',
  width: '240px'
});
exports.button = _objectSpread({}, defaultInputItem, {
  fontWeight: 'bold',
  transition: 'all 300ms linear',
  width: '90px'
});
exports.buttonHovered = _objectSpread({}, exports.primaryColor, {
  backgroundColor: '#ddd',
  border: '1px solid #ccc',
  cursor: 'pointer',
  transition: 'all 300ms linear'
});
exports.buttonLink = _objectSpread({}, exports.secondaryColor, {
  background: 'transparent',
  border: 'none',
  lineHeight: '26px',
  textDecoration: 'underline'
});
exports.buttonLinkHovered = {
  cursor: 'pointer',
  textDecoration: 'none'
};
exports.crossButton = {
  cursor: 'pointer',
  display: 'block',
  fontSize: '20px',
  position: 'absolute',
  right: '10px',
  top: '5px'
};
exports.errorText = {
  color: 'red'
};
exports.boldText = {
  fontWeight: 'bold'
};
exports.header = {
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '20px',
  textAlign: 'left'
};
exports.headerText = _objectSpread({
  fontSize: '20px',
  lineHeight: '20px',
  marginBottom: '10px'
}, exports.boldText);
exports.headerTextDescription = {
  color: secondaryTextColor,
  fontSize: '13px',
  lineHeight: '16px',
  marginBottom: '15px'
};
exports.headerDestinations = _objectSpread({}, exports.secondaryColor, {
  fontSize: '18px',
  lineHeight: '28px',
  marginBottom: '10px'
});
exports.headerDates = {
  color: secondaryTextColor,
  fontSize: '13px',
  lineHeight: '13px',
  marginBottom: '15px'
};
exports.simpleText = {
  color: secondaryTextColor,
  fontSize: '13px',
  lineHeight: '20px',
  marginTop: '0px'
};
exports.emailBlock = {
  borderBottom: '1px solid #ccc',
  marginBottom: '20px',
  paddingBottom: '20px',
  textAlign: 'left'
};
exports.emailTableContent = {
  borderTop: '1px solid #ddd',
  padding: '20px',
  textAlign: 'center'
};
exports.emailButton = {
  backgroundColor: 'white',
  border: '1px solid rgb(204, 204, 204)',
  borderRadius: '5px',
  color: 'rgb(102, 102, 102)',
  display: 'inline-block',
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 300ms linear 0s',
  width: '110px'
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Flight Watchdog</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Roboto', sans-serif;">
 {content}
</body>
</html>`;
exports.rawEmailTemplate = `From: '{emailFromName} <{emailFrom}>'
To: {emailTo}
Subject: {subject}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="NextPart"

--NextPart
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: base64

{content}

--NextPart`;
exports.rawEmailAttachmentPartTemplate = `
Content-Type: image/png; name="price-history.png"
Content-ID: <{name}>
Content-Transfer-Encoding: base64
Content-Disposition: attachment

{image}

--NextPart`;
exports.rawEmailEndPart = `--`;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

const GraphDot_1 = __webpack_require__(26);

const GraphLabel_1 = __webpack_require__(27);

const GraphPriceLimitDot_1 = __webpack_require__(28);

const Text_1 = __webpack_require__(1);

const TranslationEnum_1 = __webpack_require__(2);

const React = __webpack_require__(0);

const recharts_1 = __webpack_require__(29);

class WatchersGraphPriceHistory extends React.Component {
  render() {
    const {
      priceLimit,
      searchResults,
      watcher,
      absolutePosition
    } = this.props;
    const last15Results = searchResults.filter(item => {
      return item.created.getValidDate().isInIntervalDays(15);
    });
    const firstSearchResult = {
      origin: watcher.origin,
      destination: watcher.destination,
      flightType: watcher.flightType,
      departure: watcher.departure,
      arrival: watcher.arrival ? watcher.arrival : undefined,
      created: watcher.created,
      price: watcher.priceLimit
    };
    const last15ResultsWithFirst = searchResults.length > 1 && searchResults[0].price && searchResults[0].price.amount !== watcher.priceLimit.amount ? [firstSearchResult, ...last15Results] : last15Results;
    const data = last15ResultsWithFirst.map(item => {
      return {
        datetime: item.created.getValidDate().formatToSystem(),
        limit: priceLimit.amount,
        name: item.created.getValidDate().formatToLocalDayMonth(),
        price: item.price ? item.price.amount : priceLimit.amount
      };
    });

    if (data.length === 0) {
      return '';
    }

    const style = absolutePosition ? {
      position: 'absolute',
      top: '0',
      left: '0'
    } : {};
    return React.createElement("div", {
      style: _objectSpread({}, style)
    }, React.createElement(recharts_1.ComposedChart, {
      width: 600,
      height: 200,
      data: data,
      margin: {
        bottom: 20,
        top: 20
      }
    }, React.createElement(recharts_1.XAxis, {
      dataKey: "name",
      padding: {
        left: 10,
        right: 10
      },
      tick: {
        fontSize: 10
      }
    }), React.createElement(recharts_1.YAxis, {
      domain: ['auto', 'auto'],
      tick: {
        fontSize: 10
      }
    }), React.createElement(recharts_1.CartesianGrid, {
      stroke: "#eee",
      strokeDasharray: "3 5"
    }), React.createElement(recharts_1.Legend, {
      verticalAlign: "top",
      wrapperStyle: {
        top: '170px',
        fontSize: '10px'
      },
      iconType: "line"
    }), React.createElement(recharts_1.Line, {
      name: Text_1.translate(TranslationEnum_1.TranslationEnum.GraphLegendPriceLimit),
      isAnimationActive: false,
      type: "monotone",
      dataKey: "limit",
      stroke: "#deaf1c",
      dot: React.createElement(GraphPriceLimitDot_1.GraphPriceLimitDot, null)
    }), React.createElement(recharts_1.Area, {
      name: Text_1.translate(TranslationEnum_1.TranslationEnum.GraphLegendPriceTrend),
      isAnimationActive: false,
      type: "monotone",
      dataKey: "price",
      fillOpacity: 0.2,
      fill: "#5d92da",
      stroke: "#3c68a5",
      dot: React.createElement(GraphDot_1.GraphDot, null),
      label: React.createElement(GraphLabel_1.GraphLabel, {
        priceLimit: priceLimit
      })
    })));
  }

}

exports.WatchersGraphPriceHistory = WatchersGraphPriceHistory;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(31);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const emailFactory_1 = __webpack_require__(11);

const emailTemplates_1 = __webpack_require__(5);

const EmailLowerPriceContent_1 = __webpack_require__(19);

const EmailLowerPriceSubject_1 = __webpack_require__(30);

const WatchersGraphPriceHistory_1 = __webpack_require__(7);

const React = __webpack_require__(0);

const server_1 = __webpack_require__(6);

exports.createLowerPriceEmailRaw = async (createImage, watcherFullInfo, price, emailFrom) => {
  const {
    origin,
    destination
  } = watcherFullInfo.watcher;
  const subject = server_1.renderToStaticMarkup(React.createElement(EmailLowerPriceSubject_1.EmailLowerPriceSubject, {
    origin: origin,
    destination: destination
  }));
  const content = await exports.createLowerPriceEmail(watcherFullInfo, price, false);
  const rawEmail = emailFactory_1.createEmailRawBegin(subject, content, watcherFullInfo.watcher.email, emailFrom);
  const image = await createImage(React.createElement(WatchersGraphPriceHistory_1.WatchersGraphPriceHistory, {
    searchResults: watcherFullInfo.searchResults,
    priceLimit: watcherFullInfo.watcher.priceLimit,
    watcher: watcherFullInfo.watcher,
    absolutePosition: true
  }), 600, 200);
  const attachments = emailFactory_1.createAttachmentPngRaw(watcherFullInfo.watcher.id.toString(), image);
  return rawEmail + attachments + emailTemplates_1.rawEmailEndPart;
};

exports.createLowerPriceEmail = async (watcherFullInfo, price, showSvg) => {
  const content = React.createElement(EmailLowerPriceContent_1.EmailLowerPriceContent, {
    watcherFullInfo: watcherFullInfo,
    price: price,
    showSvg: showSvg
  });
  return emailTemplates_1.emailTemplate.replace(/\{content\}/g, server_1.renderToStaticMarkup(content));
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const emailTemplates_1 = __webpack_require__(5);

const EmailNoReplyName_1 = __webpack_require__(12);

const React = __webpack_require__(0);

const server_1 = __webpack_require__(6);

exports.createEmailRawBegin = (subject, content, emailTo, emailFrom) => {
  let raw;
  const subjectBase64 = Buffer.from(subject).toString('base64');
  const noReplyName = Buffer.from(server_1.renderToStaticMarkup(React.createElement(EmailNoReplyName_1.EmailNoReplyName, null))).toString('base64');
  const htmlBase64 = Buffer.from(content).toString('base64').replace(/([^\0]{76})/g, '$1\n');
  raw = emailTemplates_1.rawEmailTemplate.replace(/\{emailTo\}/g, emailTo.toString());
  raw = raw.replace(/\{subject\}/g, '=?utf-8?B?' + subjectBase64 + '?=');
  raw = raw.replace(/\{emailFromName\}/g, '=?utf-8?B?' + noReplyName + '?=');
  raw = raw.replace(/\{emailFrom\}/g, emailFrom.toString());
  raw = raw.replace(/\{content\}/g, htmlBase64);
  return raw;
};

exports.createAttachmentPngRaw = (name, contentBase64) => {
  let raw;
  const content = contentBase64.replace(/([^\0]{76})/g, '$1\n');
  raw = emailTemplates_1.rawEmailAttachmentPartTemplate.replace(/\{image\}/g, content);
  raw = raw.replace(/\{name\}/g, name);
  return raw;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Text_1 = __webpack_require__(1);

const TranslationEnum_1 = __webpack_require__(2);

const React = __webpack_require__(0);

class EmailNoReplyName extends React.Component {
  render() {
    return React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailNoReplyName
    });
  }

}

exports.EmailNoReplyName = EmailNoReplyName;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const extendable_error_1 = __webpack_require__(14);

class AppLogicError extends extendable_error_1.ExtendableError {}

exports.AppLogicError = AppLogicError;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const TranslationEnum_1 = __webpack_require__(2);

exports.csTranslation = {
  [TranslationEnum_1.TranslationEnum.FormatDate]: `D. M. YYYY`,
  [TranslationEnum_1.TranslationEnum.FormatDateDayMonth]: `D.M.`,
  [TranslationEnum_1.TranslationEnum.FormatDateWithDayName]: `dddd D. M. YYYY`,
  [TranslationEnum_1.TranslationEnum.ClientButtonCreate]: `Hlídat`,
  [TranslationEnum_1.TranslationEnum.ClientButtonNotInterested]: `Nemám zájem`,
  [TranslationEnum_1.TranslationEnum.ClientBadEmailError]: `E-mail nemá správný formát`,
  [TranslationEnum_1.TranslationEnum.ClientButtonOk]: `OK`,
  [TranslationEnum_1.TranslationEnum.ClientButtonYes]: `Ano`,
  [TranslationEnum_1.TranslationEnum.ClientButtonClose]: `Zavřít`,
  [TranslationEnum_1.TranslationEnum.ClientMessageCreateWatcherDone]: `Skvělé, hotovo. Až najdeme nižší cenu, pošleme Vám E-mail.`,
  [TranslationEnum_1.TranslationEnum.ClientMessageCreateWatcherWorking]: `Vytvářím záznam s novým hlídačem, za chvilku to bude...`,
  [TranslationEnum_1.TranslationEnum.ClientMessageDeleteWatcherWorking]: `Mažu záznam s hlídačem, za chvilku to bude...`,
  [TranslationEnum_1.TranslationEnum.ClientMessageError]: `Ajajaj, něco jsem pokazil, příště se polepším.`,
  [TranslationEnum_1.TranslationEnum.ClientMessageContinueWatching]: `Chcete dál sledovat cenu tohoto letu?`,
  [TranslationEnum_1.TranslationEnum.ClientMessageWatcherDeleteById]: `Opravdu chcete hlídač smazat?`,
  [TranslationEnum_1.TranslationEnum.ClientMessageWatcherAlreadyExists]: `Na tento e-mail již jeden hlídač existuje, chcete jej smazat a hlídat raději tento let?`,
  [TranslationEnum_1.TranslationEnum.ClientMessageMoreWatchersAlreadyExists]: `Na tento e-mail jste dosáhli limitu hlídačů. Pokud chcete sledovat tento let musíte smazat jeden z již existujících hlídačů. Na Váš e-mail vám byl odeslán seznam hlídačů, který můžete upravit.`,
  [TranslationEnum_1.TranslationEnum.ClientMessageMinimalizedWindow]: `Hledáte levnější letenku? Klikněte zde.`,
  [TranslationEnum_1.TranslationEnum.ClientInputEmailPlaceholder]: `vyplňte Váš e-mail...`,
  [TranslationEnum_1.TranslationEnum.ClientTitle]: `Chcete hlídat cenu {?}?`,
  [TranslationEnum_1.TranslationEnum.ClientDestinationsReturn]: `z{_}{?} do{_}{?} a{_}zpět`,
  [TranslationEnum_1.TranslationEnum.ClientDestinationsOneway]: `z{_}{?} do{_}{?}`,
  [TranslationEnum_1.TranslationEnum.ClientDescription]: `Budeme ji hlídat za Vás! Každý den pak dostanete informaci o{_}jejím vývoji.`,
  [TranslationEnum_1.TranslationEnum.ClientDatesReturn]: `{?} až {?}`,
  [TranslationEnum_1.TranslationEnum.ClientDatesOneway]: `{?}`,
  [TranslationEnum_1.TranslationEnum.EmailTitle]: `Nalezli jsme lepší cenu letu, který jste hledali!`,
  [TranslationEnum_1.TranslationEnum.EmailLowerPriceSubject]: `Nalezli jsme lepší cenu letu {?} - {?}`,
  [TranslationEnum_1.TranslationEnum.EmailDescription]: `Na základě Vašeho vytvoření upozornění na nižší cenu na webu {?}, byl tento E-mail odeslán ihned po zjištění nižší ceny.`,
  [TranslationEnum_1.TranslationEnum.EmailContentDescription]: `Nalezli jsme cenu o {?} nižší, což je o {?} % méně.`,
  [TranslationEnum_1.TranslationEnum.EmailPricePrefixText]: `Nalezená cena je`,
  [TranslationEnum_1.TranslationEnum.EmailPriceSuffixText]: `Původní cena byla {?}`,
  [TranslationEnum_1.TranslationEnum.EmailPrice]: `{?}`,
  [TranslationEnum_1.TranslationEnum.EmailPriceLimit]: `Limit ceny {?}`,
  [TranslationEnum_1.TranslationEnum.EmailButtonShowResultPrefixText]: `Pro zobrazení letu na webu klikněte na tlačítko níže:`,
  [TranslationEnum_1.TranslationEnum.EmailButtonShowResult]: `Rezervovat`,
  [TranslationEnum_1.TranslationEnum.EmailButtonContinueWatchingPrefixText]: `Důležité: Sledování letu je ukončeno při nalezení nižší ceny. Pokud chcete cenu hlídat dál, potvrďte znovu hlídání letu:`,
  [TranslationEnum_1.TranslationEnum.EmailButtonContinueWatching]: `Hlídat dál`,
  [TranslationEnum_1.TranslationEnum.EmailButtonDelete]: `Smazat`,
  [TranslationEnum_1.TranslationEnum.EmailFooter]: `Hlídání cen letů zajišťuje aplikace Flight Watchdog.`,
  [TranslationEnum_1.TranslationEnum.EmailWatcherListHeader]: `Seznam hlídačů letů`,
  [TranslationEnum_1.TranslationEnum.EmailWatcherListDescription]: `Tento E-mail byl odeslán na základě Vašeho požadavku na smazání hlídače letu na webu {?}. Po kliknutí na tlačítko smazat budete přesměrování na výsledky vyhledávání daného letu a budete vyzvání k potrvzení smazání.`,
  [TranslationEnum_1.TranslationEnum.EmailMarketingHeader]: `Vývoj cen hlídačů letů`,
  [TranslationEnum_1.TranslationEnum.EmailMarketingDescription]: `Tento E-mail je odesílán každý den na základě Vašeho založení hlídače letu na webu {?}.`,
  [TranslationEnum_1.TranslationEnum.EmailNoReplyName]: `Hlídač letenek`,
  [TranslationEnum_1.TranslationEnum.GraphLegendPriceLimit]: `Hlídaná cena`,
  [TranslationEnum_1.TranslationEnum.GraphLegendPriceTrend]: `Vývoj ceny`
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const TranslationEnum_1 = __webpack_require__(2);

exports.enTranslation = {
  [TranslationEnum_1.TranslationEnum.FormatDate]: `D MMM YYYY`,
  [TranslationEnum_1.TranslationEnum.FormatDateDayMonth]: `D MMM`,
  [TranslationEnum_1.TranslationEnum.FormatDateWithDayName]: `ddd D MMM YYYY`,
  [TranslationEnum_1.TranslationEnum.ClientButtonCreate]: `Create`,
  [TranslationEnum_1.TranslationEnum.ClientButtonNotInterested]: `I'm not interested`,
  [TranslationEnum_1.TranslationEnum.ClientBadEmailError]: `E-mail does not have the correct format`,
  [TranslationEnum_1.TranslationEnum.ClientButtonOk]: `OK`,
  [TranslationEnum_1.TranslationEnum.ClientButtonYes]: `Yes`,
  [TranslationEnum_1.TranslationEnum.ClientButtonClose]: `Close`,
  [TranslationEnum_1.TranslationEnum.ClientMessageCreateWatcherDone]: `Done. When we find a lower price, we will send you an email.`,
  [TranslationEnum_1.TranslationEnum.ClientMessageCreateWatcherWorking]: `I'm creating a record with a new watcher, please wait...`,
  [TranslationEnum_1.TranslationEnum.ClientMessageDeleteWatcherWorking]: `I'm deleting a record with the watcher, please wait...`,
  [TranslationEnum_1.TranslationEnum.ClientMessageError]: `Ooops, something went wrong.`,
  [TranslationEnum_1.TranslationEnum.ClientMessageWatcherDeleteById]: `Do you want to delete watcher?`,
  [TranslationEnum_1.TranslationEnum.ClientMessageContinueWatching]: `Do you want to keep tracking the price of this flight?`,
  [TranslationEnum_1.TranslationEnum.ClientMessageWatcherAlreadyExists]: `On this email, there is already one watcher, do you want to delete it and create new watcher?`,
  [TranslationEnum_1.TranslationEnum.ClientMessageMoreWatchersAlreadyExists]: `You have reached the limit of watchers on this email. If you want to track this flight you have to delete one of the existing watchers. A list of watchers has been sent to your email that you can edit.`,
  [TranslationEnum_1.TranslationEnum.ClientMessageMinimalizedWindow]: `Looking for a cheaper flight? Click here.`,
  [TranslationEnum_1.TranslationEnum.ClientInputEmailPlaceholder]: `fill in your e-mail...`,
  [TranslationEnum_1.TranslationEnum.ClientTitle]: `Track price {?}`,
  [TranslationEnum_1.TranslationEnum.ClientDestinationsReturn]: `from{_}{?} to{_}{?} and{_}back`,
  [TranslationEnum_1.TranslationEnum.ClientDestinationsOneway]: `from{_}{?} to{_}{?}`,
  [TranslationEnum_1.TranslationEnum.ClientDescription]: `We'll track it out for you! Every day you get price trends information.`,
  [TranslationEnum_1.TranslationEnum.ClientDatesReturn]: `{?} until {?}`,
  [TranslationEnum_1.TranslationEnum.ClientDatesOneway]: `{?}`,
  [TranslationEnum_1.TranslationEnum.EmailTitle]: `We found the better price for the flight you were looking for!`,
  [TranslationEnum_1.TranslationEnum.EmailLowerPriceSubject]: `We found a better flight price {?} - {?}`,
  [TranslationEnum_1.TranslationEnum.EmailDescription]: `Based on your lower price alert from the website {?}, this email was sent immediately after we found a lower price.`,
  [TranslationEnum_1.TranslationEnum.EmailContentDescription]: `We found the {?} cost less, which is {?} % less.`,
  [TranslationEnum_1.TranslationEnum.EmailPricePrefixText]: `Founded price is`,
  [TranslationEnum_1.TranslationEnum.EmailPriceSuffixText]: `The original price was {?}`,
  [TranslationEnum_1.TranslationEnum.EmailPrice]: `{?}`,
  [TranslationEnum_1.TranslationEnum.EmailPriceLimit]: `Price limit is {?}`,
  [TranslationEnum_1.TranslationEnum.EmailButtonShowResultPrefixText]: `Click the button below to view the flight on the web:`,
  [TranslationEnum_1.TranslationEnum.EmailButtonShowResult]: `Book`,
  [TranslationEnum_1.TranslationEnum.EmailButtonContinueWatchingPrefixText]: `Important: Flight Tracking is terminated when we found a lower price. If you want to keep tracking the price, confirm it at:`,
  [TranslationEnum_1.TranslationEnum.EmailButtonContinueWatching]: `Continue tracking`,
  [TranslationEnum_1.TranslationEnum.EmailButtonDelete]: `Delete`,
  [TranslationEnum_1.TranslationEnum.EmailFooter]: `Provided by application Flight Watchdog.`,
  [TranslationEnum_1.TranslationEnum.EmailWatcherListHeader]: `List of the flights watchdogs`,
  [TranslationEnum_1.TranslationEnum.EmailWatcherListDescription]: `This email was sent to you based on your request to delete the flight watcher on {?}. When you click delete, you will be redirected to the flight search results and you will be prompted to delete the flight.`,
  [TranslationEnum_1.TranslationEnum.EmailMarketingHeader]: `Flight prices trends`,
  [TranslationEnum_1.TranslationEnum.EmailMarketingDescription]: `This email is sent daily based on your flight attendant establishment on {?}.`,
  [TranslationEnum_1.TranslationEnum.EmailNoReplyName]: `Flight watchdog`,
  [TranslationEnum_1.TranslationEnum.GraphLegendPriceLimit]: `Price limit`,
  [TranslationEnum_1.TranslationEnum.GraphLegendPriceTrend]: `Price trend`
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SupportedLanguageEnum;

(function (SupportedLanguageEnum) {
  SupportedLanguageEnum["cs"] = "cs";
  SupportedLanguageEnum["en"] = "en";
})(SupportedLanguageEnum = exports.SupportedLanguageEnum || (exports.SupportedLanguageEnum = {}));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

const EmailButton_1 = __webpack_require__(20);

const EmailLowerPriceHeader_1 = __webpack_require__(21);

const WatcherPriceHistory_1 = __webpack_require__(25);

const styles = __webpack_require__(4);

const Text_1 = __webpack_require__(1);

const TranslationEnum_1 = __webpack_require__(2);

const React = __webpack_require__(0);

class EmailLowerPriceContent extends React.Component {
  render() {
    const {
      watcherFullInfo,
      price,
      showSvg
    } = this.props;
    const {
      watcher,
      watcherLinks
    } = watcherFullInfo;
    const {
      resultLink,
      continueLink
    } = watcherLinks;
    const priceDiff = watcher.priceLimit.subtract(price);
    const priceDiffPercent = watcher.priceLimit.diffPercent(price);
    return React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, React.createElement("table", {
      style: {
        width: '600px',
        margin: '0 auto'
      }
    }, React.createElement("tr", null, React.createElement("td", null, React.createElement(EmailLowerPriceHeader_1.EmailLowerPriceHeader, {
      watcherFullInfo: watcherFullInfo
    }))), React.createElement("tr", null, React.createElement("td", {
      style: {
        backgroundColor: '#fff'
      }
    }, React.createElement("div", {
      className: "content",
      style: styles.emailTableContent
    }, React.createElement("div", {
      style: _objectSpread({}, styles.simpleText, {
        marginBottom: '15px'
      })
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailContentDescription
    }, priceDiff.formatToLocale(), priceDiffPercent.toString())), React.createElement("div", {
      style: _objectSpread({}, styles.simpleText, {
        marginBottom: '5px'
      })
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailPricePrefixText
    })), React.createElement("div", {
      style: {
        fontSize: '25px',
        lineHeight: '25px',
        marginBottom: '10px'
      }
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailPrice
    }, price.formatToLocale())), React.createElement("div", {
      style: _objectSpread({}, styles.simpleText, {
        marginBottom: '25px'
      })
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailPriceSuffixText
    }, watcher.priceLimit.formatToLocale())), React.createElement("div", {
      style: _objectSpread({}, styles.simpleText, {
        marginBottom: '10px'
      })
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailButtonShowResultPrefixText
    })), React.createElement(EmailButton_1.EmailButton, {
      link: resultLink,
      text: TranslationEnum_1.TranslationEnum.EmailButtonShowResult,
      style: {
        marginBottom: '20px'
      }
    }), React.createElement(WatcherPriceHistory_1.WatcherPriceHistory, {
      watchersFullInfo: watcherFullInfo,
      showSvg: showSvg
    }), React.createElement("div", {
      style: _objectSpread({}, styles.simpleText, {
        marginBottom: '10px',
        marginTop: '20px'
      })
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailButtonContinueWatchingPrefixText
    })), React.createElement(EmailButton_1.EmailButton, {
      link: continueLink,
      text: TranslationEnum_1.TranslationEnum.EmailButtonContinueWatching,
      style: {
        marginBottom: '50px'
      }
    }), React.createElement("div", {
      style: _objectSpread({}, styles.simpleText, {
        marginBottom: '15px'
      })
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailFooter
    })))))));
  }

}

exports.EmailLowerPriceContent = EmailLowerPriceContent;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

const styles = __webpack_require__(4);

const Text_1 = __webpack_require__(1);

const React = __webpack_require__(0);

class EmailButton extends React.Component {
  render() {
    const {
      link,
      text,
      style
    } = this.props;
    return React.createElement("a", {
      href: link.toString(),
      style: _objectSpread({}, styles.emailButton, style)
    }, React.createElement(Text_1.Text, {
      name: text
    }));
  }

}

exports.EmailButton = EmailButton;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const HeaderDates_1 = __webpack_require__(22);

const LocationNameList_1 = __webpack_require__(23);

const styles = __webpack_require__(4);

const Text_1 = __webpack_require__(1);

const TranslationEnum_1 = __webpack_require__(2);

const React = __webpack_require__(0);

class EmailLowerPriceHeader extends React.Component {
  render() {
    const {
      watcherFullInfo
    } = this.props;
    const {
      watcher,
      watcherLinks,
      originLocationList,
      destinationLocationList
    } = watcherFullInfo;
    const {
      frontendUrl
    } = watcherLinks;
    const destinationTextKey = watcher.flightType.isReturn() ? TranslationEnum_1.TranslationEnum.ClientDestinationsReturn : TranslationEnum_1.TranslationEnum.ClientDestinationsOneway;
    return React.createElement("div", {
      style: styles.header
    }, React.createElement("div", {
      style: styles.headerText
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailTitle
    })), React.createElement("div", {
      style: styles.headerTextDescription
    }, React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailDescription
    }, React.createElement("a", {
      href: frontendUrl.toString()
    }, frontendUrl.toString()))), React.createElement("div", {
      style: styles.headerDestinations
    }, React.createElement(Text_1.Text, {
      name: destinationTextKey
    }, React.createElement("span", {
      style: styles.primaryColor
    }, React.createElement(LocationNameList_1.LocationNameList, {
      locationList: originLocationList
    })), React.createElement("span", {
      style: styles.primaryColor
    }, React.createElement(LocationNameList_1.LocationNameList, {
      locationList: destinationLocationList
    })))), React.createElement("div", {
      style: styles.headerDates
    }, React.createElement(HeaderDates_1.HeaderDates, {
      departure: watcher.departure,
      arrival: watcher.arrival
    })));
  }

}

exports.EmailLowerPriceHeader = EmailLowerPriceHeader;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Text_1 = __webpack_require__(1);

const TranslationEnum_1 = __webpack_require__(2);

const React = __webpack_require__(0);

class HeaderDates extends React.Component {
  render() {
    const {
      departure,
      arrival
    } = this.props;

    if (arrival) {
      return React.createElement(Text_1.Text, {
        name: TranslationEnum_1.TranslationEnum.ClientDatesReturn
      }, departure.formatToLocalWithDayName(), arrival.formatToLocalWithDayName());
    }

    return React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.ClientDatesOneway
    }, departure.formatToLocalWithDayName());
  }

}

exports.HeaderDates = HeaderDates;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const LocationName_1 = __webpack_require__(24);

const React = __webpack_require__(0);

class LocationNameList extends React.Component {
  render() {
    return this.props.locationList.map((location, index) => {
      return React.createElement(React.Fragment, {
        key: location.code.toString()
      }, React.createElement(LocationName_1.LocationName, {
        location: location
      }), index < this.props.locationList.length - 1 ? ', ' : '');
    });
  }

}

exports.LocationNameList = LocationNameList;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __webpack_require__(0);

class LocationName extends React.Component {
  render() {
    const {
      code,
      name
    } = this.props.location;

    if (!name) {
      return React.createElement(React.Fragment, null, code.toString());
    }

    return React.createElement(React.Fragment, null, name, "\u00A0(", code.toString(), ")");
  }

}

exports.LocationName = LocationName;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const WatchersGraphPriceHistory_1 = __webpack_require__(7);

const React = __webpack_require__(0);

class WatcherPriceHistory extends React.Component {
  render() {
    const {
      watchersFullInfo,
      showSvg
    } = this.props;
    const {
      watcher,
      searchResults
    } = watchersFullInfo;
    const imageSrc = 'cid:' + watcher.id.toString();
    return showSvg ? React.createElement(WatchersGraphPriceHistory_1.WatchersGraphPriceHistory, {
      searchResults: searchResults,
      priceLimit: watcher.priceLimit,
      watcher: watcher
    }) : React.createElement("img", {
      src: imageSrc,
      alt: "Price history"
    });
  }

}

exports.WatcherPriceHistory = WatcherPriceHistory;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __webpack_require__(0);

class GraphDot extends React.Component {
  render() {
    const {
      cx,
      cy,
      stroke
    } = this.props;
    return React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: 2,
      stroke: stroke,
      strokeWidth: 2,
      fill: stroke
    });
  }

}

exports.GraphDot = GraphDot;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __webpack_require__(0);

class GraphLabel extends React.Component {
  render() {
    const {
      x,
      y,
      stroke,
      value,
      priceLimit
    } = this.props;
    const text = value === priceLimit.amount ? priceLimit.amount : value;
    const color = value ? value >= priceLimit.amount ? '#888' : stroke : stroke;
    return React.createElement("text", {
      x: x,
      y: y,
      dy: -10,
      fill: color,
      fontSize: 10,
      textAnchor: "middle"
    }, text);
  }

}

exports.GraphLabel = GraphLabel;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __webpack_require__(0);

class GraphPriceLimitDot extends React.Component {
  render() {
    return '';
  }

}

exports.GraphPriceLimitDot = GraphPriceLimitDot;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Text_1 = __webpack_require__(1);

const TranslationEnum_1 = __webpack_require__(2);

const React = __webpack_require__(0);

class EmailLowerPriceSubject extends React.Component {
  render() {
    return React.createElement(Text_1.Text, {
      name: TranslationEnum_1.TranslationEnum.EmailLowerPriceSubject
    }, this.props.origin.toString(), this.props.destination.toString());
  }

}

exports.EmailLowerPriceSubject = EmailLowerPriceSubject;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(3));

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map