import { InMemoryAnswerCommentsReposiroty } from '@/test/repositories/inMemoryAnswerCommentsRepository'
import { FetchAnswersCommentsUseCase } from './fetchAnswerComments'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { makeAnswerComment } from '@/test/factories/makeAnswerComment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsReposiroty
let sut: FetchAnswersCommentsUseCase
describe('Fetch Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsReposiroty()
    sut = new FetchAnswersCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  test('should be able to fetch answer to answers', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer1') }),
    )

    const result = await sut.execute({
      answerId: 'answer1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  test('should be able to fetch with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
