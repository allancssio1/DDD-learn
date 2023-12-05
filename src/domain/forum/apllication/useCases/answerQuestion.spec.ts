import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnwersRepository'
import { AnswerQuestionUseCase } from './answerQuestion'

let inMemoryQuestionsRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be create a new asnwer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'nova resposta',
    })
    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('nova resposta')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(answer.id)
  })
})
