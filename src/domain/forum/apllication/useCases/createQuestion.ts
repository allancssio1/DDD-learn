import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { Question } from '../../enterprise/entities/Question'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    await this.repository.create(question)

    return { question }
  }
}
