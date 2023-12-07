import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { FetchRecentQuestionsUseCase } from './fetchRecentQuestions'
import { makeQuestion } from '@/test/factories/makeQuestion'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase
describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  test('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2022/01/20') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2022/01/21') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2022/01/22') }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2022/01/22') }),
      expect.objectContaining({ createdAt: new Date('2022/01/21') }),
      expect.objectContaining({ createdAt: new Date('2022/01/20') }),
    ])
  })

  test('should be able to fetch with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
