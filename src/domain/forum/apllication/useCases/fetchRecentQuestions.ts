import { Question } from '../../enterprise/entities/Question'
import { QuestionsRepository } from '../repositories/questionsRepository'

interface FetchRecentsQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentsQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({ page }: FetchRecentsQuestionsUseCaseRequest) {
    const questions = await this.questionRepository.findManyRecent({ page })

    if (!questions || questions.length <= 0)
      throw new Error('Questions not found.')

    return { questions }
  }
}
