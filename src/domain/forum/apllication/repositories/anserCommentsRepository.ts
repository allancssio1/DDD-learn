import { PaginationParams } from '@/core/repositories/paginationParams'
import { AnswerComment } from '../../enterprise/entities/answerComment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
  findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]>
}
