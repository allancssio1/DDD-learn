import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { DeleteQuestionUseCase } from './deleteQuestion'
import { makeQuestion } from '@/test/factories/makeQuestion'
import { Slug } from '../../enterprise/entities/valueObjects/slug'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('Find Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be find question by slug', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({
      questoinId: newQuestion.id.toString(),
    })
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
