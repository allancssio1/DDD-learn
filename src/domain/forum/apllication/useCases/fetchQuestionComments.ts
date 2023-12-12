import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'

interface FetchQuestionCommentsUseCaseRequest {
  page: number
  questionId: string
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

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
      throw new Error('Quewstion comments not found.')

    return { questionComments }
  }
}
