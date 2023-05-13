// DTO data transfer object -промежуточный макет данных для маршрутизации,
// вынесен в отдельный файл для разделения кода на функциональные подмодули
export class CreateCommentDto {
    readonly commentId: number;
    readonly commentAuthor: string;
    readonly commentText: string;
    readonly reviewId: number;
    readonly commentDate: string;
}