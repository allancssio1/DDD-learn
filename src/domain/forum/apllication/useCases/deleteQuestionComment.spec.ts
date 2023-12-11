import { InMemoryQuestionCommentsReposiroty } from '@/test/repositories/inMemoryQuestionCommentsRepository'
import { DeleteQuestionCommentUseCase } from './deleteQuestionComment'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { makeQuestionComment } from '@/test/factories/makeQuestionComment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsReposiroty
let sut: DeleteQuestionCommentUseCase
describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsReposiroty()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  test('should be delete question comment', async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionCommentRepository.create(newQuestionComment)
    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questoinCommentId: newQuestionComment.id.toString(),
    })
    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  test('should not be delete question comment if action author diff question comment author', async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    expect(
      async () =>
        await sut.execute({
          authorId: 'author-2',
          questoinCommentId: newQuestionComment.id.toString(),
        }),
    ).rejects.toThrow(new Error('Not allowed'))
  })
})
