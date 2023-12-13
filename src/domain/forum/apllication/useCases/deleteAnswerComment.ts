import { Either, rigth } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/anserCommentsRepository'

interface DeleteAnswerCommentUseCaseRequest {
  questoinCommentId: string
  authorId: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    questoinCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answercomment =
      await this.answerCommentRepository.findById(questoinCommentId)

    if (!answercomment) throw new Error('Answer not found!')

    if (authorId !== answercomment.authorId.toString())
      throw new Error('Not allowed')

    await this.answerCommentRepository.delete(answercomment)

    return rigth({})
  }
}
