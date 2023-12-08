import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { EditQuestionUseCase } from './editQuestion'
import { makeQuestion } from '@/test/factories/makeQuestion'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
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
      content: 'editting question content',
      title: 'editting title',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      content: 'editting question content',
      title: 'editting title',
    })
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
          content: 'editting question content',
          title: 'editting title',
        }),
    ).rejects.toThrow(new Error('Not allowed'))
  })
})
