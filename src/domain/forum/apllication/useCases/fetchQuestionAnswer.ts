import { Answer } from '../../enterprise/entities/Answer'
import { AnswerRepository } from '../repositories/answerRepository'

interface FetchQuestionAnswersUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    if (!answers || answers.length <= 0) throw new Error('Answers not found.')

    return { answers }
  }
}
