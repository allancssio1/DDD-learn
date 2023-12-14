import { InMemoryQuestionCommentsReposiroty } from '@/test/repositories/inMemoryQuestionCommentsRepository'
import { FetchQuestionCommentsUseCase } from './fetchQuestionComments'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { makeQuestionComment } from '@/test/factories/makeQuestionComment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsReposiroty
let sut: FetchQuestionCommentsUseCase
describe('Fetch Question Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsReposiroty()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  test('should be able to fetch answer to questions', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question1') }),
    )

    const result = await sut.execute({
      questionId: 'question1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  test('should be able to fetch with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
