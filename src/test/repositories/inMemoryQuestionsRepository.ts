import { QuestionsRepository } from '@/domain/forum/apllication/repositories/questionsRepository'
import { Question } from '@/domain/forum/enterprise/entities/Question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.items.find((item) => item.slug.value === slug)

    return question ?? null
  }
}
