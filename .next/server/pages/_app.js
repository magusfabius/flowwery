/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/components/AuthProvider.js":
/*!****************************************!*\
  !*** ./src/components/AuthProvider.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _onflow_fcl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @onflow/fcl */ \"@onflow/fcl\");\n/* harmony import */ var _onflow_fcl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_onflow_fcl__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n//import { Session } from \"next-auth\"\n//import { backendClient } from \"../graphql/backendClient\"\n//import { WalletDocument } from \"../../generated/graphql\"\n//import { getClientFromSession } from \"../graphql/getClientFromSession\"\n/*\ntype AuthComponentProps = {\n  children: React.ReactNode\n  requireAuth: boolean | undefined\n}\n\ntype AuthContextType = {\n  session: Session\n  isLoading: boolean\n  signIn: (callbackUrl?: string) => Promise<void>\n  signOut: () => Promise<void>\n}\n*/ const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(null);\nfunction AuthProvider({ children , requireAuth  }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();\n    const sessionLoading = status === \"loading\";\n    const [isAuthenticating, setIsAuthenticating] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const isLoading = sessionLoading || isAuthenticating;\n    const signIn = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async (callbackUrl)=>{\n        setIsAuthenticating(true);\n        await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.signIn)(\"niftory\", {\n            callbackUrl\n        });\n        setIsAuthenticating(false);\n    }, []);\n    const signOut = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async (callbackUrl = \"/\")=>{\n        setIsAuthenticating(true);\n        _onflow_fcl__WEBPACK_IMPORTED_MODULE_4__.unauthenticate();\n        await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.signOut)({\n            redirect: false,\n            callbackUrl\n        });\n        setIsAuthenticating(false);\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{}, [\n        session\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (!requireAuth || isLoading) {\n            return;\n        }\n        if (session?.error) {\n            console.error(session.error);\n            signOut();\n            return;\n        }\n        if (!session || !session?.userId) {\n            router.push(\"/\");\n            return;\n        }\n    }, [\n        requireAuth,\n        session,\n        router,\n        isLoading,\n        signOut\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (session && !isLoading) {\n            (async ()=>{\n                console.log(\"now you should get all the info linked to the wallet\");\n            /*\n        const client = await getClientFromSession(session)\n        const { wallet } = await client.request(WalletDocument)\n        if (!wallet) {\n          backendClient(\"createWallet\")\n        }\n        */ })();\n        }\n    }, [\n        isLoading,\n        session\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            session,\n            isLoading,\n            signIn,\n            signOut\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/damycarlino/Documents/flowwery/src/components/AuthProvider.js\",\n        lineNumber: 87,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9BdXRoUHJvdmlkZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QztBQUNnQztBQUUzQjtBQUNWO0FBQ29EO0FBQ3RGLHFDQUFxQztBQUNyQywwREFBMEQ7QUFDMUQsMERBQTBEO0FBQzFELHdFQUF3RTtBQUV4RTs7Ozs7Ozs7Ozs7O0FBWUEsR0FFTyxNQUFNVyw0QkFBY1Ysb0RBQWFBLENBQUMsSUFBSSxFQUFDO0FBRXZDLFNBQVNXLGFBQWEsRUFBRUMsU0FBUSxFQUFFQyxZQUFXLEVBQUUsRUFBRTtJQUN0RCxNQUFNQyxTQUFTZixzREFBU0E7SUFFeEIsTUFBTSxFQUFFZ0IsTUFBTUMsUUFBTyxFQUFFQyxPQUFNLEVBQUUsR0FBR2IsMkRBQVVBO0lBQzVDLE1BQU1jLGlCQUFpQkQsV0FBVztJQUdsQyxNQUFNLENBQUNFLGtCQUFrQkMsb0JBQW9CLEdBQUdqQiwrQ0FBUUEsQ0FBQyxLQUFLO0lBQzlELE1BQU1rQixZQUFZSCxrQkFBa0JDO0lBRXBDLE1BQU1YLFNBQVNQLGtEQUFXQSxDQUFDLE9BQU9xQixjQUFnQjtRQUNoREYsb0JBQW9CLElBQUk7UUFDeEIsTUFBTVgsdURBQWNBLENBQUMsV0FBVztZQUFFYTtRQUFZO1FBQzlDRixvQkFBb0IsS0FBSztJQUMzQixHQUFHLEVBQUU7SUFFTCxNQUFNZCxVQUFVTCxrREFBV0EsQ0FBQyxPQUFPcUIsY0FBYyxHQUFHLEdBQUs7UUFDdkRGLG9CQUFvQixJQUFJO1FBQ3hCZix1REFBa0I7UUFDbEIsTUFBTUUsd0RBQWVBLENBQUM7WUFBRWlCLFVBQVUsS0FBSztZQUFFRjtRQUFZO1FBQ3JERixvQkFBb0IsS0FBSztJQUMzQixHQUFHLEVBQUU7SUFFTGxCLGdEQUFTQSxDQUFDLElBQU0sQ0FDaEIsR0FBRztRQUFDYztLQUFRO0lBRVpkLGdEQUFTQSxDQUFDLElBQU07UUFDZCxJQUFJLENBQUNXLGVBQWVRLFdBQVc7WUFDN0I7UUFDRixDQUFDO1FBRUQsSUFBSUwsU0FBU1MsT0FBTztZQUNsQkMsUUFBUUQsS0FBSyxDQUFDVCxRQUFRUyxLQUFLO1lBQzNCbkI7WUFDQTtRQUNGLENBQUM7UUFFRCxJQUFJLENBQUNVLFdBQVcsQ0FBQ0EsU0FBU1csUUFBUTtZQUNoQ2IsT0FBT2MsSUFBSSxDQUFDO1lBQ1o7UUFDRixDQUFDO0lBQ0gsR0FBRztRQUFDZjtRQUFhRztRQUFTRjtRQUFRTztRQUFXZjtLQUFRO0lBRXJESixnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsSUFBSWMsV0FBVyxDQUFDSyxXQUFXO1lBQ3hCLFdBQVk7Z0JBQ1hLLFFBQVFHLEdBQUcsQ0FBQztZQUNaOzs7Ozs7UUFNQSxHQUNGO1FBQ0YsQ0FBQztJQUNILEdBQUc7UUFBQ1I7UUFBV0w7S0FBUTtJQUV2QixxQkFDRSw4REFBQ04sWUFBWW9CLFFBQVE7UUFBQ0MsT0FBTztZQUFFZjtZQUFTSztZQUFXYjtZQUFRRjtRQUFRO2tCQUNoRU07Ozs7OztBQUdQLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3QvLi9zcmMvY29tcG9uZW50cy9BdXRoUHJvdmlkZXIuanM/ZGNmOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIlxuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgeyB1c2VTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9yZWFjdFwiXG5pbXBvcnQgKiBhcyBmY2wgZnJvbSBcIkBvbmZsb3cvZmNsXCJcbmltcG9ydCB7IHNpZ25PdXQgYXMgbmV4dEF1dGhTaWduT3V0LCBzaWduSW4gYXMgbmV4dEF1dGhTaWduSW4gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCJcbi8vaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxuLy9pbXBvcnQgeyBiYWNrZW5kQ2xpZW50IH0gZnJvbSBcIi4uL2dyYXBocWwvYmFja2VuZENsaWVudFwiXG4vL2ltcG9ydCB7IFdhbGxldERvY3VtZW50IH0gZnJvbSBcIi4uLy4uL2dlbmVyYXRlZC9ncmFwaHFsXCJcbi8vaW1wb3J0IHsgZ2V0Q2xpZW50RnJvbVNlc3Npb24gfSBmcm9tIFwiLi4vZ3JhcGhxbC9nZXRDbGllbnRGcm9tU2Vzc2lvblwiXG5cbi8qXG50eXBlIEF1dGhDb21wb25lbnRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZVxuICByZXF1aXJlQXV0aDogYm9vbGVhbiB8IHVuZGVmaW5lZFxufVxuXG50eXBlIEF1dGhDb250ZXh0VHlwZSA9IHtcbiAgc2Vzc2lvbjogU2Vzc2lvblxuICBpc0xvYWRpbmc6IGJvb2xlYW5cbiAgc2lnbkluOiAoY2FsbGJhY2tVcmw/OiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD5cbiAgc2lnbk91dDogKCkgPT4gUHJvbWlzZTx2b2lkPlxufVxuKi9cblxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dChudWxsKVxuXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4sIHJlcXVpcmVBdXRoIH0pIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuICBjb25zdCB7IGRhdGE6IHNlc3Npb24sIHN0YXR1cyB9ID0gdXNlU2Vzc2lvbigpXG4gIGNvbnN0IHNlc3Npb25Mb2FkaW5nID0gc3RhdHVzID09PSBcImxvYWRpbmdcIlxuXG5cbiAgY29uc3QgW2lzQXV0aGVudGljYXRpbmcsIHNldElzQXV0aGVudGljYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IGlzTG9hZGluZyA9IHNlc3Npb25Mb2FkaW5nIHx8IGlzQXV0aGVudGljYXRpbmdcblxuICBjb25zdCBzaWduSW4gPSB1c2VDYWxsYmFjayhhc3luYyAoY2FsbGJhY2tVcmwpID0+IHtcbiAgICBzZXRJc0F1dGhlbnRpY2F0aW5nKHRydWUpXG4gICAgYXdhaXQgbmV4dEF1dGhTaWduSW4oXCJuaWZ0b3J5XCIsIHsgY2FsbGJhY2tVcmwgfSlcbiAgICBzZXRJc0F1dGhlbnRpY2F0aW5nKGZhbHNlKVxuICB9LCBbXSlcblxuICBjb25zdCBzaWduT3V0ID0gdXNlQ2FsbGJhY2soYXN5bmMgKGNhbGxiYWNrVXJsID0gXCIvXCIpID0+IHtcbiAgICBzZXRJc0F1dGhlbnRpY2F0aW5nKHRydWUpXG4gICAgZmNsLnVuYXV0aGVudGljYXRlKClcbiAgICBhd2FpdCBuZXh0QXV0aFNpZ25PdXQoeyByZWRpcmVjdDogZmFsc2UsIGNhbGxiYWNrVXJsIH0pXG4gICAgc2V0SXNBdXRoZW50aWNhdGluZyhmYWxzZSlcbiAgfSwgW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgfSwgW3Nlc3Npb25dKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFyZXF1aXJlQXV0aCB8fCBpc0xvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uPy5lcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihzZXNzaW9uLmVycm9yKVxuICAgICAgc2lnbk91dCgpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24/LnVzZXJJZCkge1xuICAgICAgcm91dGVyLnB1c2goXCIvXCIpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH0sIFtyZXF1aXJlQXV0aCwgc2Vzc2lvbiwgcm91dGVyLCBpc0xvYWRpbmcsIHNpZ25PdXRdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlc3Npb24gJiYgIWlzTG9hZGluZykge1xuICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJub3cgeW91IHNob3VsZCBnZXQgYWxsIHRoZSBpbmZvIGxpbmtlZCB0byB0aGUgd2FsbGV0XCIpXG4gICAgICAgIC8qXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudEZyb21TZXNzaW9uKHNlc3Npb24pXG4gICAgICAgIGNvbnN0IHsgd2FsbGV0IH0gPSBhd2FpdCBjbGllbnQucmVxdWVzdChXYWxsZXREb2N1bWVudClcbiAgICAgICAgaWYgKCF3YWxsZXQpIHtcbiAgICAgICAgICBiYWNrZW5kQ2xpZW50KFwiY3JlYXRlV2FsbGV0XCIpXG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgIH0pKClcbiAgICB9XG4gIH0sIFtpc0xvYWRpbmcsIHNlc3Npb25dKVxuXG4gIHJldHVybiAoXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHNlc3Npb24sIGlzTG9hZGluZywgc2lnbkluLCBzaWduT3V0IH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gIClcbn0iXSwibmFtZXMiOlsidXNlUm91dGVyIiwiY3JlYXRlQ29udGV4dCIsInVzZUNhbGxiYWNrIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VTZXNzaW9uIiwiZmNsIiwic2lnbk91dCIsIm5leHRBdXRoU2lnbk91dCIsInNpZ25JbiIsIm5leHRBdXRoU2lnbkluIiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInJlcXVpcmVBdXRoIiwicm91dGVyIiwiZGF0YSIsInNlc3Npb24iLCJzdGF0dXMiLCJzZXNzaW9uTG9hZGluZyIsImlzQXV0aGVudGljYXRpbmciLCJzZXRJc0F1dGhlbnRpY2F0aW5nIiwiaXNMb2FkaW5nIiwiY2FsbGJhY2tVcmwiLCJ1bmF1dGhlbnRpY2F0ZSIsInJlZGlyZWN0IiwiZXJyb3IiLCJjb25zb2xlIiwidXNlcklkIiwicHVzaCIsImxvZyIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/AuthProvider.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_AuthProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/AuthProvider */ \"./src/components/AuthProvider.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n//import { ComponentWithAuth } from \"../components/ComponentWithAuth\"\n\nconst App = ({ Component , pageProps: { session , auth , ...pageProps }  })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Walletless Onboarding by Niftory\"\n                }, void 0, false, {\n                    fileName: \"/Users/damycarlino/Documents/flowwery/src/pages/_app.js\",\n                    lineNumber: 16,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/damycarlino/Documents/flowwery/src/pages/_app.js\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_3__.SessionProvider, {\n                session: session,\n                refetchInterval: 60 * 60,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AuthProvider__WEBPACK_IMPORTED_MODULE_4__.AuthProvider, {\n                    requireAuth: Component.requireAuth,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/damycarlino/Documents/flowwery/src/pages/_app.js\",\n                        lineNumber: 20,\n                        columnNumber: 15\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/damycarlino/Documents/flowwery/src/pages/_app.js\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/damycarlino/Documents/flowwery/src/pages/_app.js\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBRUw7QUFDd0I7QUFFUTtBQUN6RCxxRUFBcUU7QUFDekM7QUFJNUIsTUFBTUksTUFBTSxDQUFDLEVBQUVDLFVBQVMsRUFBRUMsV0FBVyxFQUFFQyxRQUFPLEVBQUVDLEtBQUksRUFBRSxHQUFHRixXQUFXLEdBQUUsR0FBSztJQUN6RSxxQkFDRTs7MEJBQ0UsOERBQUNILGtEQUFJQTswQkFDSCw0RUFBQ007OEJBQU07Ozs7Ozs7Ozs7OzBCQUVULDhEQUFDUiw0REFBZUE7Z0JBQUNNLFNBQVNBO2dCQUFTRyxpQkFBaUIsS0FBSzswQkFDdkQsNEVBQUNSLGtFQUFZQTtvQkFBQ1MsYUFBYU4sVUFBVU0sV0FBVzs4QkFDMUMsNEVBQUNOO3dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU10QztBQUVBLGlFQUFlRixHQUFHQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG90Ly4vc3JjL3BhZ2VzL19hcHAuanM/OGZkYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBTZXNzaW9uUHJvdmlkZXIgfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCJcblxuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvQXV0aFByb3ZpZGVyXCJcbi8vaW1wb3J0IHsgQ29tcG9uZW50V2l0aEF1dGggfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Db21wb25lbnRXaXRoQXV0aFwiXG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCJcblxuXG5cbmNvbnN0IEFwcCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzOiB7IHNlc3Npb24sIGF1dGgsIC4uLnBhZ2VQcm9wcyB9IH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5XYWxsZXRsZXNzIE9uYm9hcmRpbmcgYnkgTmlmdG9yeTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8U2Vzc2lvblByb3ZpZGVyIHNlc3Npb249e3Nlc3Npb259IHJlZmV0Y2hJbnRlcnZhbD17NjAgKiA2MH0+XG4gICAgICAgIDxBdXRoUHJvdmlkZXIgcmVxdWlyZUF1dGg9e0NvbXBvbmVudC5yZXF1aXJlQXV0aH0+XG4gICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9BdXRoUHJvdmlkZXI+XG4gICAgICA8L1Nlc3Npb25Qcm92aWRlcj5cbiAgICA8Lz5cbiAgKVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG4vKlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuKi8iXSwibmFtZXMiOlsiUmVhY3QiLCJTZXNzaW9uUHJvdmlkZXIiLCJBdXRoUHJvdmlkZXIiLCJIZWFkIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwic2Vzc2lvbiIsImF1dGgiLCJ0aXRsZSIsInJlZmV0Y2hJbnRlcnZhbCIsInJlcXVpcmVBdXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@onflow/fcl":
/*!******************************!*\
  !*** external "@onflow/fcl" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@onflow/fcl");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();