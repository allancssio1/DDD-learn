import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { AnswerQuestionUseCase } from './answerQuestion'

let inMemoryQuestionsRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be create a new asnwer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'nova resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.answer)
  })
})
