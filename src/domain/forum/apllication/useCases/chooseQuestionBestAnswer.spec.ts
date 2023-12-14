import { InMemoryQuestionsRepository } from '@/test/repositories/inMemoryQuestionsRepository'
import { ChooseQuestionBestAnswerUseCase } from './chooseQuestionBestAnswer'
import { makeQuestion } from '@/test/factories/makeQuestion'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { InMemoryAnswersRepository } from '@/test/repositories/inMemoryAnswersRepository'
import { makeAnswer } from '@/test/factories/makeAnswer'
import { NotAllowedError } from './errors/notAllowedError'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  test('should be able to the choose question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  test('It should not be possible to mark a best answer from a different question author.', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    const { value, isLeft } = await sut.execute({
      authorId: 'author-2',
      answerId: answer.id.toString(),
    })

    expect(isLeft()).toBe(true)
    expect(value).toBeInstanceOf(NotAllowedError)
  })
})
