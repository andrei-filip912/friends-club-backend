/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/interaction/src/application/interaction.controller.ts":
/*!********************************************************************!*\
  !*** ./apps/interaction/src/application/interaction.controller.ts ***!
  \********************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const interaction_service_1 = __webpack_require__(/*! ../domain/interaction.service */ "./apps/interaction/src/domain/interaction.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const microservices_2 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
let InteractionController = class InteractionController {
    constructor(interactionService, rmqService) {
        this.interactionService = interactionService;
        this.rmqService = rmqService;
    }
    getHello() {
        return this.interactionService.getHello();
    }
    async handleOrderCreated(data, context) {
        this.interactionService.createInteraction(data);
        console.log(data);
        this.rmqService.ack(context);
    }
};
exports.InteractionController = InteractionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], InteractionController.prototype, "getHello", null);
__decorate([
    (0, microservices_1.EventPattern)('post_created'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof microservices_2.RmqContext !== "undefined" && microservices_2.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], InteractionController.prototype, "handleOrderCreated", null);
exports.InteractionController = InteractionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof interaction_service_1.InteractionService !== "undefined" && interaction_service_1.InteractionService) === "function" ? _a : Object, typeof (_b = typeof common_2.RmqService !== "undefined" && common_2.RmqService) === "function" ? _b : Object])
], InteractionController);


/***/ }),

/***/ "./apps/interaction/src/domain/interaction.service.ts":
/*!************************************************************!*\
  !*** ./apps/interaction/src/domain/interaction.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InteractionService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InteractionService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let InteractionService = InteractionService_1 = class InteractionService {
    constructor() {
        this.logger = new common_1.Logger(InteractionService_1.name);
    }
    getHello() {
        return 'Hello World!';
    }
    createInteraction(data) {
        this.logger.log("Got an event!", data);
    }
};
exports.InteractionService = InteractionService;
exports.InteractionService = InteractionService = InteractionService_1 = __decorate([
    (0, common_1.Injectable)()
], InteractionService);


/***/ }),

/***/ "./apps/interaction/src/infrastructure/interaction.module.ts":
/*!*******************************************************************!*\
  !*** ./apps/interaction/src/infrastructure/interaction.module.ts ***!
  \*******************************************************************/
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
const interaction_controller_1 = __webpack_require__(/*! ../application/interaction.controller */ "./apps/interaction/src/application/interaction.controller.ts");
const interaction_service_1 = __webpack_require__(/*! ../domain/interaction.service */ "./apps/interaction/src/domain/interaction.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const Joi = __webpack_require__(/*! joi */ "joi");
const common_2 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
const reaction_repository_1 = __webpack_require__(/*! ./reaction.repository */ "./apps/interaction/src/infrastructure/reaction.repository.ts");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const reaction_schema_1 = __webpack_require__(/*! ./reaction.schema */ "./apps/interaction/src/infrastructure/reaction.schema.ts");
const common_3 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
let InteractionModule = class InteractionModule {
};
exports.InteractionModule = InteractionModule;
exports.InteractionModule = InteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    MONGODB_URI: Joi.string().required(),
                    RABBIT_MQ_URI: Joi.string().required(),
                    RABBIT_MQ_INTERACTION_QUEUE: Joi.string().required(),
                }),
                envFilePath: './apps/interaction/.env'
            }),
            common_2.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: reaction_schema_1.ReactionDocument.name, schema: reaction_schema_1.ReactionSchema }]),
            common_3.RmqModule
        ],
        controllers: [interaction_controller_1.InteractionController],
        providers: [interaction_service_1.InteractionService, reaction_repository_1.ReactionRepository],
    })
], InteractionModule);


/***/ }),

/***/ "./apps/interaction/src/infrastructure/reaction.repository.ts":
/*!********************************************************************!*\
  !*** ./apps/interaction/src/infrastructure/reaction.repository.ts ***!
  \********************************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReactionRepository_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactionRepository = void 0;
const common_1 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const reaction_schema_1 = __webpack_require__(/*! ./reaction.schema */ "./apps/interaction/src/infrastructure/reaction.schema.ts");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let ReactionRepository = ReactionRepository_1 = class ReactionRepository extends common_1.AbstractRepository {
    constructor(reactionModel, connection) {
        super(reactionModel, connection);
        this.logger = new common_2.Logger(ReactionRepository_1.name);
    }
    ;
};
exports.ReactionRepository = ReactionRepository;
exports.ReactionRepository = ReactionRepository = ReactionRepository_1 = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reaction_schema_1.ReactionDocument.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Connection !== "undefined" && mongoose_2.Connection) === "function" ? _b : Object])
], ReactionRepository);


/***/ }),

/***/ "./apps/interaction/src/infrastructure/reaction.schema.ts":
/*!****************************************************************!*\
  !*** ./apps/interaction/src/infrastructure/reaction.schema.ts ***!
  \****************************************************************/
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
exports.ReactionSchema = exports.ReactionDocument = void 0;
const common_1 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const reaction_type_enum_1 = __webpack_require__(/*! @friends-club/common/domain/enums/reaction-type.enum */ "./libs/common/src/domain/enums/reaction-type.enum.ts");
let ReactionDocument = class ReactionDocument extends common_1.AbstractDocument {
};
exports.ReactionDocument = ReactionDocument;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ReactionDocument.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ReactionDocument.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: reaction_type_enum_1.ReactionType }),
    __metadata("design:type", typeof (_a = typeof reaction_type_enum_1.ReactionType !== "undefined" && reaction_type_enum_1.ReactionType) === "function" ? _a : Object)
], ReactionDocument.prototype, "reactionType", void 0);
exports.ReactionDocument = ReactionDocument = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false })
], ReactionDocument);
exports.ReactionSchema = mongoose_1.SchemaFactory.createForClass(ReactionDocument);


/***/ }),

/***/ "./libs/common/src/domain/Interfaces/mongodb.interface.repository.ts":
/*!***************************************************************************!*\
  !*** ./libs/common/src/domain/Interfaces/mongodb.interface.repository.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/common/src/domain/Interfaces/mongodb.interface.schema.ts":
/*!***********************************************************************!*\
  !*** ./libs/common/src/domain/Interfaces/mongodb.interface.schema.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/common/src/domain/enums/reaction-type.enum.ts":
/*!************************************************************!*\
  !*** ./libs/common/src/domain/enums/reaction-type.enum.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactionType = void 0;
var ReactionType;
(function (ReactionType) {
    ReactionType[ReactionType["like"] = 0] = "like";
    ReactionType[ReactionType["dislike"] = 1] = "dislike";
})(ReactionType || (exports.ReactionType = ReactionType = {}));


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(/*! ./infrastructure/database/mongodb/mongodb.module */ "./libs/common/src/infrastructure/database/mongodb/mongodb.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./infrastructure/database/mongodb/mongodb.abstract.repository */ "./libs/common/src/infrastructure/database/mongodb/mongodb.abstract.repository.ts"), exports);
__exportStar(__webpack_require__(/*! ./infrastructure/database/mongodb/mongodb.abstract.schema */ "./libs/common/src/infrastructure/database/mongodb/mongodb.abstract.schema.ts"), exports);
__exportStar(__webpack_require__(/*! ./infrastructure/services/rmq/rmq.service */ "./libs/common/src/infrastructure/services/rmq/rmq.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/Interfaces/mongodb.interface.repository */ "./libs/common/src/domain/Interfaces/mongodb.interface.repository.ts"), exports);
__exportStar(__webpack_require__(/*! ./domain/Interfaces/mongodb.interface.schema */ "./libs/common/src/domain/Interfaces/mongodb.interface.schema.ts"), exports);
__exportStar(__webpack_require__(/*! ./infrastructure/services/rmq/rmq.module */ "./libs/common/src/infrastructure/services/rmq/rmq.module.ts"), exports);


/***/ }),

/***/ "./libs/common/src/infrastructure/database/mongodb/mongodb.abstract.repository.ts":
/*!****************************************************************************************!*\
  !*** ./libs/common/src/infrastructure/database/mongodb/mongodb.abstract.repository.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! mongoose */ "mongoose");
class AbstractRepository {
    constructor(model, connection) {
        this.model = model;
        this.connection = connection;
    }
    async create(document, options) {
        const createdDocument = new this.model({
            ...document,
            _id: new mongoose_1.Types.ObjectId(),
        });
        return (await createdDocument.save(options)).toJSON();
    }
    async findOne(filterQuery) {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async findOneAndUpdate(filterQuery, update) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true,
        });
        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new common_1.NotFoundException('Document not found.');
        }
        return document;
    }
    async upsert(filterQuery, document) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true,
        });
    }
    async find(filterQuery) {
        return this.model.find(filterQuery, {}, { lean: true });
    }
    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }
}
exports.AbstractRepository = AbstractRepository;


/***/ }),

/***/ "./libs/common/src/infrastructure/database/mongodb/mongodb.abstract.schema.ts":
/*!************************************************************************************!*\
  !*** ./libs/common/src/infrastructure/database/mongodb/mongodb.abstract.schema.ts ***!
  \************************************************************************************/
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
exports.AbstractDocument = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let AbstractDocument = class AbstractDocument {
};
exports.AbstractDocument = AbstractDocument;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], AbstractDocument.prototype, "_id", void 0);
exports.AbstractDocument = AbstractDocument = __decorate([
    (0, mongoose_1.Schema)()
], AbstractDocument);


/***/ }),

/***/ "./libs/common/src/infrastructure/database/mongodb/mongodb.module.ts":
/*!***************************************************************************!*\
  !*** ./libs/common/src/infrastructure/database/mongodb/mongodb.module.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);


/***/ }),

/***/ "./libs/common/src/infrastructure/services/rmq/rmq.module.ts":
/*!*******************************************************************!*\
  !*** ./libs/common/src/infrastructure/services/rmq/rmq.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.RmqService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let RmqService = class RmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(queue, noAck = false) {
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBIT_MQ_URI')],
                queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            }
        };
    }
    ack(context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
};
exports.RmqService = RmqService;
exports.RmqService = RmqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RmqService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

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
const interaction_module_1 = __webpack_require__(/*! ./infrastructure/interaction.module */ "./apps/interaction/src/infrastructure/interaction.module.ts");
const common_1 = __webpack_require__(/*! @friends-club/common */ "./libs/common/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(interaction_module_1.InteractionModule);
    const rmqService = app.get(common_1.RmqService);
    app.connectMicroservice(rmqService.getOptions('INTERACTION'));
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;