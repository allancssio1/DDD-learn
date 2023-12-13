import { Either, left, rigth } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/anserCommentsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { NotAllowedError } from './errors/notAllowedError'

interface DeleteAnswerCommentUseCaseRequest {
  questoinCommentId: string
  authorId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    questoinCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment =
      await this.answerCommentRepository.findById(questoinCommentId)

    if (!answercomment) return left(new ResourceNotFoundError())

    if (authorId !== answercomment.authorId.toString())
      return left(new NotAllowedError())

    await this.answerCommentRepository.delete(answercomment)

    return rigth({})
  }
}
