import { Either, left, rigth } from '@/core/either'
import { AnswerRepository } from '../repositories/answerRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { NotAllowedError } from './errors/notAllowedError'

interface DeleteAnswerUseCaseRequest {
  id: string
  authorId: string
}

type DeleteAnswerUseCaseRsponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private repository: AnswerRepository) {}
  async execute({
    id,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseRsponse> {
    const question = await this.repository.findById(id)

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    await this.repository.delete(question)

    return rigth(null)
  }
}
