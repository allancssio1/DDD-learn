import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { Question } from '../../enterprise/entities/question'
import { Either, rigth } from '@/core/either'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

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

    return rigth({ question })
  }
}
