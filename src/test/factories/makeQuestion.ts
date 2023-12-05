import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/Question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )

  return question
}
