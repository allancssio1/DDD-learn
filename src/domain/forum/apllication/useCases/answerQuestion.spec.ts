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
    const { value } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'nova resposta',
    })
    console.log(value)

    expect(value?.answer.id).toBeTruthy()
    expect(value?.answer.content).toEqual('nova resposta')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(value?.answer.id)
  })
})
