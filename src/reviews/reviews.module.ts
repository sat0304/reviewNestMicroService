import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from "../comments/comments.model";
import { Review } from './reviews.model';
import { CommentsModule } from '../comments/comments.module';

@Module({  
    controllers: [ReviewsController],
    providers: [ReviewsService],
    imports: [
        CommentsModule,
        SequelizeModule.forFeature([Comment, Review])]
})
export class ReviewsModule {}
