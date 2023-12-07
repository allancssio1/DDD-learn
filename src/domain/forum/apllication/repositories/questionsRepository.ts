import { PaginationParams } from '@/core/repositories/paginationParams'
import { Question } from '../../enterprise/entities/Question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findManyRecent(props: PaginationParams): Promise<Question[]>
  findById(questionId: string): Promise<Question | null>
}
