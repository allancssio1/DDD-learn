import { QuestionsRepository } from '../repositories/questionsRepository'

interface EditQuestionUseCaseRequest {
  questoinId: string
  authorId: string
  title: string
  content: string
}

export class EditQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questoinId,
    content,
    title,
    authorId,
  }: EditQuestionUseCaseRequest): Promise<void> {
    const question = await this.repository.findById(questoinId)

    if (!question) throw new Error('Question not found!')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    question.title = title
    question.content = content

    await this.repository.save(question)
  }
}
