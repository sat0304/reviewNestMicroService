import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/createCommentDto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor( private commentService: CommentsService) {}

    @Post()
    async create(@Body() dto: CreateCommentDto) {
        return await this.commentService.createComment(dto);
    }

    @Get('/:commentId')
    async getByKinopoiskId(@Param('commentId') commentId: any  ) {
        return await this.commentService.getCommentById( commentId );
    }

    @Get()
    async getAllComments() {
        return await this.commentService.getAllComments();
    }

}
