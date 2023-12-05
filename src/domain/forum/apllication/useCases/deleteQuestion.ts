import { QuestionsRepository } from '../repositories/questionsRepository'

interface DeleteQuestionUseCaseRequest {
  questoinId: string
}

export class DeleteQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({ questoinId }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.repository.findById(questoinId)

    if (!question) throw new Error('Question not found!')
    await this.repository.delete(question)
  }
}
