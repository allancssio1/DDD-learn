import { Either, left, rigth } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { AnswerRepository } from '../repositories/answerRepository'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { NotAllowedError } from './errors/notAllowedError'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}
type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return rigth({ question })
  }
}
