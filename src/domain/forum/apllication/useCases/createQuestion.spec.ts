import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { CreateQuestionUseCase } from './createQuestion'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  test('should be create a new asnwer', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova Question',
      content: 'nova resposta',
      attachmentsIds: ['1', '2'],
    })
    expect(result.isRight()).toBe(true)
    expect(result.value?.question.content).toEqual('nova resposta')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value?.question.id,
    )
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
