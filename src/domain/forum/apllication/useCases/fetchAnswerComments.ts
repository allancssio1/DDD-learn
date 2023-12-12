import { AnswerComment } from '../../enterprise/entities/answerComment'
import { AnswerCommentsRepository } from '../repositories/anserCommentsRepository'

interface FetchAnswerCommentsUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

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
      throw new Error('Answer comments not found.')

    return { answerComments }
  }
}
