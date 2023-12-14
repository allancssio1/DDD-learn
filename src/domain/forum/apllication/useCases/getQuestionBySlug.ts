import { QuestionsRepository } from '../repositories/questionsRepository'
import { Question } from '../../enterprise/entities/question'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { Either, left, rigth } from '@/core/either'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.repository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return rigth({ question })
  }
}
