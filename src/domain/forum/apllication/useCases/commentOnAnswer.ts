import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { AnswerComment } from '../../enterprise/entities/answerComment'
import { AnswerRepository } from '../repositories/answerRepository'
import { AnswerCommentsRepository } from '../repositories/anserCommentsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { Either, left, rigth } from '@/core/either'

interface CommentOnAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswer {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
    const question = await this.answerRepository.findById(answerId)

    if (!question) return left(new ResourceNotFoundError())

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),
    })

    await this.answerCommentRepository.create(answerComment)

    return rigth({ answerComment })
  }
}
