import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'

interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestion {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) throw new Error('Question not found.')

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.questionCommentRepository.create(questionComment)

    return { questionComment }
  }
}
