import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { GetQuestionBySlugUseCase } from './getQuestionBySlug'
import { makeQuestion } from '@/test/factories/makeQuestion'
import { Slug } from '../../enterprise/entities/valueObjects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
describe('Find Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  test('should be find question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })
    inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      slug: 'example-question',
    })
    expect(result.value).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
