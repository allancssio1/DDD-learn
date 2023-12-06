import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { DeleteQuestionUseCase } from './deleteQuestion'
import { makeQuestion } from '@/test/factories/makeQuestion'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('Find Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be delete question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questoinId: newQuestion.id.toString(),
    })
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  test('should not be delete question if action author diff question author', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    expect(
      async () =>
        await sut.execute({
          authorId: 'author-2',
          questoinId: newQuestion.id.toString(),
        }),
    ).rejects.toThrow(new Error('Not allowed'))
  })
})
