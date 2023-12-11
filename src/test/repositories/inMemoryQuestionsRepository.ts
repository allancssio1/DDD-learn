import { PaginationParams } from '@/core/repositories/paginationParams'
import { QuestionsRepository } from '@/domain/forum/apllication/repositories/questionsRepository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.items.find((item) => item.slug.value === slug)

    return question ?? null
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = await this.items.find(
      (item) => item.id.toString() === questionId,
    )
    return question ?? null
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }

  async save(question: Question): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id === question.id,
    )

    this.items[itemIndex] = question
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }
}
