import { Either, left, rigth } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    if (!questionComments || questionComments.length <= 0)
      return left(new ResourceNotFoundError())

    return rigth({ questionComments })
  }
}
