import { Either, left, rigth } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { NotAllowedError } from './errors/notAllowedError'

interface EditQuestionUseCaseRequest {
  questoinId: string
  authorId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questoinId,
    content,
    title,
    authorId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.repository.findById(questoinId)

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    question.title = title
    question.content = content

    await this.repository.save(question)
    return rigth({ question })
  }
}
