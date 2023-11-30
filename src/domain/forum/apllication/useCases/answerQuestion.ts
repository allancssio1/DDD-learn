import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '../../enterprise/entities/Answer'
import { AnswerRepository } from '../repositories/answerRepository'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private repository: AnswerRepository) {}
  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.repository.create(answer)

    return answer
  }
}
