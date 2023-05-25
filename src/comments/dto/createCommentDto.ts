// DTO data transfer object -промежуточный макет данных для маршрутизации,
// вынесен в отдельный файл для разделения кода на функциональные подмодули
export class CreateCommentDto {
    commentId: number;
    commentAuthor: string;
    commentText: string;
    reviewId: number;
    commentDate: string;
}