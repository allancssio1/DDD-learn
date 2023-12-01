import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/Question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Example question',
    slug: Slug.create('example-question'),
    content: 'content',
    authorId: new UniqueEntityId('1'),
    ...override,
  })

  return question
}
