import { InMemoryAnswerCommentsReposiroty } from '@/test/repositories/inMemoryAnswerCommentsRepository'
import { DeleteAnswerCommentUseCase } from './deleteAnswerComment'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { makeAnswerComment } from '@/test/factories/makeAnswerComment'
import { NotAllowedError } from './errors/notAllowedError'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsReposiroty
let sut: DeleteAnswerCommentUseCase
describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsReposiroty()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  test('should be delete answer comment', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerCommentRepository.create(newAnswerComment)
    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      questoinCommentId: newAnswerComment.id.toString(),
    })
    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  test('should not be delete answer comment if action author diff answer comment author', async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    const result = await sut.execute({
      authorId: 'author-2',
      questoinCommentId: newAnswerComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
