import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Question } from '../../enterprise/entities/question'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'

interface CommentOnQuestoinRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestoinResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestoin {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestoinRequest): Promise<CommentOnQuestoinResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) throw new Error('Question not found.')

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    return { questionComment }
  }
}
