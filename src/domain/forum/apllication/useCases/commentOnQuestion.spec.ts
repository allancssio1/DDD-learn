import { InMemoryQuestionCommentsReposiroty } from '@/test/repositories/inMemoryQuestionCommentsRepository'
import { CommentOnQuestion } from './commentOnQuestion'
import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { makeQuestion } from '@/test/factories/makeQuestion'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsReposiroty
let sut: CommentOnQuestion
describe('Comment Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsReposiroty()

    sut = new CommentOnQuestion(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  test('should be create a new comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário de teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentário de teste',
    )
  })
})
