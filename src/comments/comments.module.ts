import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from '../reviews/reviews.model';
import { Comment } from "./comments.model";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([Comment, Review])],
  exports: [CommentsService],
})
export class CommentsModule {}
