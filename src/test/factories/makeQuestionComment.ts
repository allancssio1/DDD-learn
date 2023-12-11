import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/questionComment'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      questionId: new UniqueEntityId('questoin-id-1'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('author-id-1'),
      ...override,
    },
    id,
  )

  return questionComment
}
