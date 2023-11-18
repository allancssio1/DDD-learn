import { Answer } from '../entities/Answer'
import { AnswerRepository } from '../repositorues/answerRepository'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private repository: AnswerRepository) {}
  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    await this.repository.create(answer)

    return answer
  }
}
