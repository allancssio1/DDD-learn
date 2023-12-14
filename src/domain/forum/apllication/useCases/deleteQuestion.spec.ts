import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { DeleteQuestionUseCase } from './deleteQuestion'
import { makeQuestion } from '@/test/factories/makeQuestion'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { NotAllowedError } from './errors/notAllowedError'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('Delete Question', () => {
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

    const result = await sut.execute({
      authorId: 'author-2',
      questoinId: newQuestion.id.toString(),
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
