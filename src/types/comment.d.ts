// src/types/comment.d.ts

/**
 * Комментарий к посту
 */
export interface Comment {
    /** Уникальный идентификатор комментария */
    id: string;
    /** Идентификатор поста, к которому относится комментарий */
    postId: string;
    /** Текст комментария */
    text: string;
    /** Идентификатор автора (IP или кошелек) */
    authorId?: string;
    /** Время создания комментария */
    date: Date;
    /** Флаг удалённого модератором */
    deleted?: boolean;
    /** Кто и когда отредактировал (если модерация) */
    moderatedBy?: string;
    moderatedAt?: Date;
    /** Заметка модератора (например, причина удаления/редактирования) */
    moderatorNote?: string;
  }  