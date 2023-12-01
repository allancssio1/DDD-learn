import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { CreateQuestionUseCase } from './createQuestion'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be create a new asnwer', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova Question',
      content: 'nova resposta',
    })
    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('nova resposta')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
