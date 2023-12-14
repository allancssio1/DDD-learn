import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answerRepository'
import { Either, rigth } from '@/core/either'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private repository: AnswerRepository) {}
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.repository.create(answer)

    return rigth({ answer })
  }
}
