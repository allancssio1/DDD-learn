import { Answer } from '../../enterprise/entities/Answer'
import { AnswerRepository } from '../repositories/answerRepository'

interface EditAnswerUseCaseRequest {
  questoinId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private repository: AnswerRepository) {}

  async execute({
    questoinId,
    content,
    authorId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.repository.findById(questoinId)

    if (!answer) throw new Error('Answer not found!')

    if (authorId !== answer.authorId.toString()) throw new Error('Not allowed')

    answer.content = content

    await this.repository.save(answer)

    return { answer }
  }
}
