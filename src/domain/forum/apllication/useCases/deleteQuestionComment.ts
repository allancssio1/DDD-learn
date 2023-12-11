import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'

interface DeleteQuestionCommentUseCaseRequest {
  questoinCommentId: string
  authorId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}
  async execute({
    questoinCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<void> {
    const questioncomment =
      await this.questionCommentRepository.findById(questoinCommentId)

    if (!questioncomment) throw new Error('Question not found!')

    if (authorId !== questioncomment.authorId.toString())
      throw new Error('Not allowed')

    await this.questionCommentRepository.delete(questioncomment)
  }
}
