/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup_credentials_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setup/credentials.js */ \"./src/setup/credentials.js\");\n\n\nconst endpoint = \"https://graphql.contentful.com/content/v1/spaces/\" + _setup_credentials_js__WEBPACK_IMPORTED_MODULE_0__.SPACE_ID;\nconsole.log(endpoint)\nconst query = `{\n  microblogCollection {\n    items {\n      sys {\n        firstPublishedAt\n        id\n      }\n      text\n      image {\n        url\n        title\n        width\n        height\n        description\n      }\n      panther\n      link\n      linkText\n    }\n  }\n}`;\n\nconst fetchOptions = {\n  method: \"POST\",\n  headers: {\n    Authorization: \"Bearer \" + _setup_credentials_js__WEBPACK_IMPORTED_MODULE_0__.ACCESS_TOKEN,\n    \"Content-Type\": \"application/json\",\n  },\n  body: JSON.stringify({ query }),\n};\n\nconst getMonthStringFromInt = (int) => {\n  const months = [\n    \"Jan\",\n    \"Feb\",\n    \"Mar\",\n    \"Apr\",\n    \"May\",\n    \"Jun\",\n    \"Jul\",\n    \"Aug\",\n    \"Sep\",\n    \"Oct\",\n    \"Nov\",\n    \"Dec\",\n  ];\n\n  return months[int];\n};\n\nconst addLeadingZero = (num) => {\n  num = num.toString();\n  while (num.length < 2) num = \"0\" + num;\n  return num;\n};\n\nconst renderFooterDate = () => {\n  const footerYearHolder = document.querySelector(\"[data-footer-year]\");\n  const timestamp = Date.now();\n  const date = new Date(timestamp);\n  footerYearHolder.innerText = date.getFullYear();\n};\n\nconst formatPublishedDateForDateTime = (dateString) => {\n  const timestamp = Date.parse(dateString);\n  const date = new Date(timestamp);\n  return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${date.getDate()}`;\n};\n\nconst formatPublishedDateForDisplay = (dateString) => {\n  const timestamp = Date.parse(dateString);\n  const date = new Date(timestamp);\n  return `${date.getDate()} ${getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;\n};\n\nconst microblogHolder = document.querySelector(\"[data-items]\");\n\nconst itemClassNames = {\n  container: \"item__container\",\n  topRow: \"item__topRow\",\n  date: \"item__date\",\n  img: \"item__img\",\n  link: \"item__link\",\n  panther: \"item__panther\",\n  text: \"item__text\",\n};\n\nconst renderItems = (items) => {\n  items.forEach((item) => {\n    const newItemEl = document.createElement(\"article\");\n    newItemEl.setAttribute(\"id\", item.sys.id);\n    newItemEl.className = itemClassNames.container;\n\n    const newTopRow = document.createElement(\"div\");\n    newTopRow.className = itemClassNames.topRow;\n\n    const newPantherEl = document.createElement(\"img\");\n    newPantherEl.src = `./panthers/${item.panther}.svg`;\n    newPantherEl.alt = `${item.panther} panther emote`;\n    newPantherEl.setAttribute(\"width\", \"50\");\n    newPantherEl.setAttribute(\"height\", \"50\");\n    newPantherEl.className = itemClassNames.panther;\n    newTopRow.appendChild(newPantherEl);\n\n    const newDateEl = document.createElement(\"time\");\n    newDateEl.setAttribute(\"datetime\", formatPublishedDateForDateTime(item.sys.firstPublishedAt));\n    newDateEl.innerText = formatPublishedDateForDisplay(item.sys.firstPublishedAt);\n    newDateEl.className = itemClassNames.date;\n    newTopRow.appendChild(newDateEl);\n\n    newItemEl.appendChild(newTopRow);\n\n    if (item.image) {\n      const newImgEl = document.createElement(\"img\");\n      newImgEl.src = `${item.image.url}?w=500`;\n      newImgEl.alt = item.image.description;\n      newImgEl.setAttribute(\"width\", item.image.width);\n      newImgEl.setAttribute(\"height\", item.image.height);\n      newImgEl.className = itemClassNames.img;\n      newItemEl.appendChild(newImgEl);\n    }\n\n    if (item.text) {\n      const newTextEl = document.createElement(\"h2\");\n      newTextEl.innerText = item.text;\n      newTextEl.className = itemClassNames.text;\n      newItemEl.appendChild(newTextEl);\n    }\n\n    if (item.link) {\n      const newLinkEl = document.createElement(\"a\");\n      newLinkEl.href = item.link;\n      newLinkEl.innerText = item.linkText || \"View more\";\n      newLinkEl.setAttribute(\"target\", \"_blank\");\n      newLinkEl.setAttribute(\"rel\", \"noopener noreferrer\");\n      newLinkEl.className = itemClassNames.link;\n      newItemEl.appendChild(newLinkEl);\n    }\n\n    microblogHolder.appendChild(newItemEl);\n  });\n};\n\nrenderFooterDate();\n\nfetch(endpoint, fetchOptions)\n  .then((response) => response.json())\n  .then((data) => renderItems(data.data.microblogCollection.items));\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/setup/credentials.js":
/*!**********************************!*\
  !*** ./src/setup/credentials.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SPACE_ID\": () => (/* binding */ SPACE_ID),\n/* harmony export */   \"ACCESS_TOKEN\": () => (/* binding */ ACCESS_TOKEN)\n/* harmony export */ });\nconst SPACE_ID = \"xji18eqnmcf0\";\nconst ACCESS_TOKEN = \"ZajNsGeFri3vTfvSHiplZLqMj6jWWcGgu_AfjDQhH8E\";\n\n//# sourceURL=webpack:///./src/setup/credentials.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;