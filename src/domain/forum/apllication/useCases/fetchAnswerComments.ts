import { Either, left, rigth } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answerComment'
import { AnswerCommentsRepository } from '../repositories/anserCommentsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswersCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    if (!answerComments || answerComments.length <= 0)
      return left(new ResourceNotFoundError())

    return rigth({ answerComments })
  }
}
