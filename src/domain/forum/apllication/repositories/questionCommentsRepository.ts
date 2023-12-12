import { PaginationParams } from '@/core/repositories/paginationParams'
import { QuestionComment } from '../../enterprise/entities/questionComment'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(questionCommentId: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: string,
    props: PaginationParams,
  ): Promise<QuestionComment[]>
}
