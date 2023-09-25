/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/interaction/src/interaction.controller.ts":
/*!********************************************************!*\
  !*** ./apps/interaction/src/interaction.controller.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const interaction_service_1 = __webpack_require__(/*! ./interaction.service */ "./apps/interaction/src/interaction.service.ts");
let InteractionController = class InteractionController {
    constructor(interactionService) {
        this.interactionService = interactionService;
    }
    getHello() {
        return this.interactionService.getHello();
    }
};
exports.InteractionController = InteractionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], InteractionController.prototype, "getHello", null);
exports.InteractionController = InteractionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof interaction_service_1.InteractionService !== "undefined" && interaction_service_1.InteractionService) === "function" ? _a : Object])
], InteractionController);


/***/ }),

/***/ "./apps/interaction/src/interaction.module.ts":
/*!****************************************************!*\
  !*** ./apps/interaction/src/interaction.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const interaction_controller_1 = __webpack_require__(/*! ./interaction.controller */ "./apps/interaction/src/interaction.controller.ts");
const interaction_service_1 = __webpack_require__(/*! ./interaction.service */ "./apps/interaction/src/interaction.service.ts");
let InteractionModule = class InteractionModule {
};
exports.InteractionModule = InteractionModule;
exports.InteractionModule = InteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [interaction_controller_1.InteractionController],
        providers: [interaction_service_1.InteractionService],
    })
], InteractionModule);


/***/ }),

/***/ "./apps/interaction/src/interaction.service.ts":
/*!*****************************************************!*\
  !*** ./apps/interaction/src/interaction.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let InteractionService = class InteractionService {
    getHello() {
        return 'Hello World!';
    }
};
exports.InteractionService = InteractionService;
exports.InteractionService = InteractionService = __decorate([
    (0, common_1.Injectable)()
], InteractionService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./apps/interaction/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const interaction_module_1 = __webpack_require__(/*! ./interaction.module */ "./apps/interaction/src/interaction.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(interaction_module_1.InteractionModule);
    await app.listen(8001);
}
bootstrap();

})();

/******/ })()
;