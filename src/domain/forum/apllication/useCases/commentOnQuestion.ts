import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'
import { Either, left, rigth } from '@/core/either'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

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

    if (!question) return left(new ResourceNotFoundError())

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.questionCommentRepository.create(questionComment)

    return rigth({ questionComment })
  }
}
