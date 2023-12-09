import { InMemoryAnswerCommentsReposiroty } from '@/test/repositories/inMemoryAnswerCommentsRepository'
import { CommentOnAnswer } from './commentOnAnswer'
import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { makeAnswer } from '@/test/factories/makeAnswer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsReposiroty
let sut: CommentOnAnswer
describe('Comment Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsReposiroty()

    sut = new CommentOnAnswer(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  test('should be create a new comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário de teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentário de teste',
    )
  })
})
