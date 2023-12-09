import { AnswerComment } from '../../enterprise/entities/answerComment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
