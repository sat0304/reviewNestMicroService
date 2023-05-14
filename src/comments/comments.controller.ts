import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/createCommentDto';
import { CommentsService } from './comments.service';

@Controller()
export class CommentsController {

    constructor( private commentService: CommentsService) {}

    @Post()
    async create(@Body() dto: CreateCommentDto) {
        return await this.commentService.createComment(dto);
    }

    @Get('/:reviewId/:commentId')
    async getById(
        @Param('commentId') commentId: number) {
        // @Param('reviewId') reviewId: number ) {
        return await this.commentService.getCommentById( commentId );
    }

    @Get('/:reviewId/comments')
    async getAllComments() {
        return await this.commentService.getAllComments();
    }

}
