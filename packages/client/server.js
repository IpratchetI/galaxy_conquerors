"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var path = require("path");
var http = require("http");
var vite_1 = require("vite");
// const express = require('express');
var express_1 = require("express");
var isProduction = process.env.NODE_ENV === 'production';
var port = process.env.CLIENT_PORT || 3000;
function getStyleSheets() {
    return __awaiter(this, void 0, void 0, function () {
        var assetsPath, files, cssAssets, allContent, _i, cssAssets_1, asset, content, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    assetsPath = './dist/client/assets';
                    return [4 /*yield*/, fs_1.promises.readdir(assetsPath)];
                case 1:
                    files = _a.sent();
                    cssAssets = files.filter(function (l) { return l.endsWith('.css'); });
                    allContent = [];
                    _i = 0, cssAssets_1 = cssAssets;
                    _a.label = 2;
                case 2:
                    if (!(_i < cssAssets_1.length)) return [3 /*break*/, 5];
                    asset = cssAssets_1[_i];
                    return [4 /*yield*/, fs_1.promises.readFile(path.join(assetsPath, asset), 'utf-8')];
                case 3:
                    content = _a.sent();
                    allContent.push(content);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, "<style type=\"text/css\">".concat(allContent.join(''), "</style>")];
                case 6:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
var initialState = {
    userState: { isAuth: false, isLoading: false, score: { maxScore: 0, lastGameScore: 0 } }
};
function createServer() {
    return __awaiter(this, void 0, void 0, function () {
        var templateHtml, _a, ssrManifest, _b, app, vite, server;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isProduction) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs_1.promises.readFile('./dist/client/index.html', 'utf-8')];
                case 1:
                    _a = _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = '';
                    _c.label = 3;
                case 3:
                    templateHtml = _a;
                    if (!isProduction) return [3 /*break*/, 5];
                    return [4 /*yield*/, fs_1.promises.readFile('./dist/client/ssr-manifest.json', 'utf-8')];
                case 4:
                    _b = _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _b = undefined;
                    _c.label = 6;
                case 6:
                    ssrManifest = _b;
                    app = (0, express_1["default"])();
                    return [4 /*yield*/, (0, vite_1.createServer)({
                            server: { middlewareMode: true },
                            appType: 'custom'
                        })];
                case 7:
                    vite = _c.sent();
                    isProduction
                        ? app.use('/', express_1["default"].static('./dist/client', { index: false }))
                        : app.use(vite.middlewares);
                    app.use('*', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var url, template, render, cookies, rendered, stateMarkup, stylesSheets, _a, html, e_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 11, , 12]);
                                    url = req.originalUrl;
                                    template = void 0;
                                    render = void 0;
                                    if (!!isProduction) return [3 /*break*/, 4];
                                    return [4 /*yield*/, fs_1.promises.readFile('./index.html', 'utf-8')];
                                case 1:
                                    template = _b.sent();
                                    return [4 /*yield*/, vite.transformIndexHtml(url, template)];
                                case 2:
                                    template = _b.sent();
                                    return [4 /*yield*/, vite.ssrLoadModule('/src/entry-server.tsx')];
                                case 3:
                                    render = (_b.sent()).render;
                                    return [3 /*break*/, 6];
                                case 4:
                                    template = templateHtml;
                                    return [4 /*yield*/, vite.ssrLoadModule('./dist/server/entry-server.js')];
                                case 5:
                                    render = (_b.sent()).render;
                                    _b.label = 6;
                                case 6:
                                    cookies = req.cookies;
                                    return [4 /*yield*/, render({ path: url }, cookies, ssrManifest)];
                                case 7:
                                    rendered = _b.sent();
                                    stateMarkup = "<script>window.__PRELOADED_STATE__ = ".concat(JSON.stringify(initialState), "</script>");
                                    if (!isProduction) return [3 /*break*/, 9];
                                    return [4 /*yield*/, getStyleSheets()];
                                case 8:
                                    _a = _b.sent();
                                    return [3 /*break*/, 10];
                                case 9:
                                    _a = '';
                                    _b.label = 10;
                                case 10:
                                    stylesSheets = _a;
                                    html = template
                                        .replace('<!--ssr-app-->', rendered)
                                        .replace('<!--ssr-styles-->', stylesSheets !== null && stylesSheets !== void 0 ? stylesSheets : '')
                                        .replace('<!--preloadedState-->', stateMarkup);
                                    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
                                    return [3 /*break*/, 12];
                                case 11:
                                    e_2 = _b.sent();
                                    if (e_2 instanceof Error) {
                                        vite.ssrFixStacktrace(e_2);
                                        console.log(e_2.stack);
                                        res.status(500).end(e_2.stack);
                                    }
                                    return [3 /*break*/, 12];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.use(express_1["default"].static('./dist/client/assets'));
                    server = http.createServer(app);
                    server.listen(port, function () {
                        console.log("Server started at http://localhost:".concat(port));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
createServer();
