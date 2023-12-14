import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { EditAnswerUseCase } from './editAnswer'
import { makeAnswer } from '@/test/factories/makeAnswer'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  test('should be delete answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      questoinId: newAnswer.id.toString(),
      content: 'editting answer content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'editting answer content',
    })
  })

  test('should not be delete answer if action author diff answer author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      questoinId: newAnswer.id.toString(),
      content: 'editting answer content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
