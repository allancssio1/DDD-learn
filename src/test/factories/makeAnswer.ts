import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/Answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const anser = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return anser
}
