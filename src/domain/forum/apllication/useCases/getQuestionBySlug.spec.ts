import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { GetQuestionBySlugUseCase } from './getQuestionBySlug'
import { Question } from '../../enterprise/entities/Question'
import { Slug } from '../../enterprise/entities/valueObjects/slug'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
describe('Find Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  test('should be find question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example question',
      slug: Slug.create('example-question'),
      content: 'content',
      authorId: new UniqueEntityId('1'),
    })
    inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'example-question',
    })
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
