import { AnswerRepository } from '@/domain/forum/apllication/repositories/answerRepository'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const anser = this.items.find((item) => item.id.toString() === id)
    return anser ?? null
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }
}
