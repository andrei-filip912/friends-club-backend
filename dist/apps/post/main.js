/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/post/src/post.controller.ts":
/*!******************************************!*\
  !*** ./apps/post/src/post.controller.ts ***!
  \******************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/.pnpm/ts-loader@9.5.0_typescript@5.2.2_webpack@5.89.0/node_modules/ts-loader/index.js):\nError: EIO: i/o error, open '/usr/src/app/apps/post/src/post.controller.ts'");

/***/ }),

/***/ "./apps/post/src/post.module.ts":
/*!**************************************!*\
  !*** ./apps/post/src/post.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const post_controller_1 = __webpack_require__(/*! ./post.controller */ "./apps/post/src/post.controller.ts");
const post_service_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './post.service'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const common_2 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const Joi = __webpack_require__(/*! joi */ "joi");
const services_1 = __webpack_require__(/*! ./services */ "./apps/post/src/services.ts");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    RABBIT_MQ_URI: Joi.string().required(),
                    RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
                }),
                envFilePath: './apps/post/.env'
            }),
            common_2.RmqModule.register({
                name: services_1.INTERACTION_SERVICE,
            })
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
    })
], PostModule);


/***/ }),

/***/ "./apps/post/src/services.ts":
/*!***********************************!*\
  !*** ./apps/post/src/services.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.INTERACTION_SERVICE = void 0;
exports.INTERACTION_SERVICE = 'INTERACTION';


/***/ }),

/***/ "./libs/common/src/domain/Interfaces/mongodb.interface.repository.ts":
/*!***************************************************************************!*\
  !*** ./libs/common/src/domain/Interfaces/mongodb.interface.repository.ts ***!
  \***************************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/.pnpm/ts-loader@9.5.0_typescript@5.2.2_webpack@5.89.0/node_modules/ts-loader/index.js):\nError: EIO: i/o error, open '/usr/src/app/libs/common/src/domain/Interfaces/mongodb.interface.repository.ts'");

/***/ }),

/***/ "./libs/common/src/domain/Interfaces/mongodb.interface.schema.ts":
/*!***********************************************************************!*\
  !*** ./libs/common/src/domain/Interfaces/mongodb.interface.schema.ts ***!
  \***********************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/.pnpm/ts-loader@9.5.0_typescript@5.2.2_webpack@5.89.0/node_modules/ts-loader/index.js):\nError: EIO: i/o error, open '/usr/src/app/libs/common/src/domain/Interfaces/mongodb.interface.schema.ts'");

/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './infrastructure/database/mongodb/mongodb.module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), exports);
__exportStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './infrastructure/database/mongodb/mongodb.abstract.repository'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), exports);
__exportStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './infrastructure/database/mongodb/mongodb.abstract.schema'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), exports);
__exportStar(__webpack_require__(/*! ./infrastructure/services/rmq/rmq.service */ "./libs/common/src/infrastructure/services/rmq/rmq.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/Interfaces/mongodb.interface.repository */ "./libs/common/src/domain/Interfaces/mongodb.interface.repository.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/Interfaces/mongodb.interface.schema */ "./libs/common/src/domain/Interfaces/mongodb.interface.schema.ts"), exports);
__exportStar(__webpack_require__(/*! ./infrastructure/services/rmq/rmq.module */ "./libs/common/src/infrastructure/services/rmq/rmq.module.ts"), exports);


/***/ }),

/***/ "./libs/common/src/infrastructure/services/rmq/rmq.module.ts":
/*!*******************************************************************!*\
  !*** ./libs/common/src/infrastructure/services/rmq/rmq.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rmq_service_1 = __webpack_require__(/*! ./rmq.service */ "./libs/common/src/infrastructure/services/rmq/rmq.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService) => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBIT_MQ_URI')],
                                queue: configService.get(`RABBIT_MQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [config_1.ConfigService],
                    }
                ])
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
exports.RmqModule = RmqModule;
exports.RmqModule = RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);
;


/***/ }),

/***/ "./libs/common/src/infrastructure/services/rmq/rmq.service.ts":
/*!********************************************************************!*\
  !*** ./libs/common/src/infrastructure/services/rmq/rmq.service.ts ***!
  \********************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/.pnpm/ts-loader@9.5.0_typescript@5.2.2_webpack@5.89.0/node_modules/ts-loader/index.js):\nError: EIO: i/o error, open '/usr/src/app/libs/common/src/infrastructure/services/rmq/rmq.service.ts'");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("joi");

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./apps/post/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const post_module_1 = __webpack_require__(/*! ./post.module */ "./apps/post/src/post.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(post_module_1.PostModule);
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;