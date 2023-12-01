import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { Question } from '../../enterprise/entities/Question'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.repository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found by slug.')
    }

    return { question }
  }
}
