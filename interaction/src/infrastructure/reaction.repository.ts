import { AbstractRepository } from "@friends-club/common";
import { Injectable, Logger } from "@nestjs/common";
import { ReactionDocument } from "./reaction.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Model, Connection } from "mongoose";

@Injectable()
export class ReactionRepository extends AbstractRepository<ReactionDocument> {
    protected readonly logger: Logger = new Logger(ReactionRepository.name);

    constructor(
        @InjectModel(ReactionDocument.name) reactionModel : Model<ReactionDocument>,
        @InjectConnection() connection: Connection,
    ){
        super(reactionModel, connection);
    };
    
}