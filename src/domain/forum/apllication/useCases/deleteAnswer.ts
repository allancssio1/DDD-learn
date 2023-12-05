import { AnswerRepository } from '../repositories/answerRepository'

interface DeleteAnswerUseCaseRequest {
  id: string
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private repository: AnswerRepository) {}
  async execute({ id, authorId }: DeleteAnswerUseCaseRequest): Promise<void> {
    const question = await this.repository.findById(id)

    if (!question) throw new Error('Question not found!')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    await this.repository.delete(question)
  }
}
