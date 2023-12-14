import { Either, left, rigth } from '@/core/either'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { NotAllowedError } from './errors/notAllowedError'

interface DeleteQuestionUseCaseRequest {
  questoinId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({
    questoinId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.repository.findById(questoinId)

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    await this.repository.delete(question)

    return rigth(null)
  }
}
