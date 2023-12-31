import { PaginationParams } from '@/core/repositories/paginationParams'
import { Answer } from '../../enterprise/entities/answer'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(
    quastionId: string,
    props: PaginationParams,
  ): Promise<Answer[]>
}
