import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { FetchRecentQuestionsUseCase } from './fetchQuestionAnswer'
import { makeAnswer } from '@/test/factories/makeAnswer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchRecentQuestionsUseCase
describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryAnswersRepository)
  })

  test('should be able to fetch answer to questions', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question1') }),
    )

    const result = await sut.execute({ questionId: 'question1', page: 1 })

    expect(result.value?.answers).toHaveLength(3)
  })

  test('should be able to fetch with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
