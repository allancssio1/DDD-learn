import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { Question } from '../../enterprise/entities/question'
import { Either, rigth } from '@/core/either'
import { QuesitonAttachment } from '../../enterprise/entities/questionAttachment'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}
  async execute({
    authorId,
    content,
    title,
    attachmentsIds = [],
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    const questionAttachements = attachmentsIds.map((attachmentsId) => {
      return QuesitonAttachment.create({
        attachmentId: new UniqueEntityId(attachmentsId),
        quesitonId: question.id,
      })
    })

    question.attachments = questionAttachements

    await this.repository.create(question)

    return rigth({ question })
  }
}
