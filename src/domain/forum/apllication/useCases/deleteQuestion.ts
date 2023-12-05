import { QuestionsRepository } from '../repositories/questionsRepository'

interface DeleteQuestionUseCaseRequest {
  questoinId: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({
    questoinId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.repository.findById(questoinId)

    if (!question) throw new Error('Question not found!')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    await this.repository.delete(question)
  }
}
