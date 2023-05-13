import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/createReviewDto';

@Controller('reviews')
export class ReviewsController {

    constructor( private reviewService: ReviewsService) {}

    @Post()
    async create(@Body() dto: CreateReviewDto) {
        return await this.reviewService.createReview(dto);
    }

    @Get('/:reviewId')
    async getById(@Param('reviewId') reviewId: any  ) {
        return await this.reviewService.getReviewById( reviewId );
    }

    @Get()
    async getAllReviews() {
        return await this.reviewService.getAllReviews();
    }

    @Patch(':reviewId')
    async updateReview(
        @Param('reviewId') reviewId: number,
        commentIds: number[]) {
      return await this.reviewService.updateCommentInReview(
        reviewId,
        commentIds);
    }
}
