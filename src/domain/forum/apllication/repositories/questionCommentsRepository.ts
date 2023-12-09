import { QuestionComment } from '../../enterprise/entities/questionComment'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
