import { makeAnswer } from '@/test/factories/makeAnswer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { DeleteAnswerUseCase } from './deleteAnswer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  test('should be delete question', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      id: newAnswer.id.toString(),
    })
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  test('should not be delete question if action author diff question author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    expect(
      async () =>
        await sut.execute({
          authorId: 'author-2',
          id: newAnswer.id.toString(),
        }),
    ).rejects.toThrow(new Error('Not allowed'))
  })
})
