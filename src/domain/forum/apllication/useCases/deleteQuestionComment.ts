import { Either, left, rigth } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'
import { NotAllowedError } from './errors/notAllowedError'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface DeleteQuestionCommentUseCaseRequest {
  questoinCommentId: string
  authorId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}
  async execute({
    questoinCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questioncomment =
      await this.questionCommentRepository.findById(questoinCommentId)

    if (!questioncomment) return left(new ResourceNotFoundError())

    if (authorId !== questioncomment.authorId.toString())
      return left(new NotAllowedError())

    await this.questionCommentRepository.delete(questioncomment)

    return rigth(null)
  }
}
