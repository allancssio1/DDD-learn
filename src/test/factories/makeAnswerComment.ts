import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answerComment'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityId('questoin-id-1'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('author-id-1'),
      ...override,
    },
    id,
  )

  return answerComment
}
