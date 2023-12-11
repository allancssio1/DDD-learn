import { AnswerCommentsRepository } from '../repositories/anserCommentsRepository'

interface DeleteAnswerCommentUseCaseRequest {
  questoinCommentId: string
  authorId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}
  async execute({
    questoinCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<void> {
    const answercomment =
      await this.answerCommentRepository.findById(questoinCommentId)

    if (!answercomment) throw new Error('Answer not found!')

    if (authorId !== answercomment.authorId.toString())
      throw new Error('Not allowed')

    await this.answerCommentRepository.delete(answercomment)
  }
}
