import { Question } from '../../enterprise/entities/Question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  findById(questionId: string): Promise<Question | null>
}
