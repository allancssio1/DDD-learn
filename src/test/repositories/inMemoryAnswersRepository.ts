import { PaginationParams } from '@/core/repositories/paginationParams'
import { AnswerRepository } from '@/domain/forum/apllication/repositories/answerRepository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const anser = this.items.find((item) => item.id.toString() === id)
    return anser ?? null
  }

  async delete(answer: Answer) {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer) {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.items[itemIndex] = answer
  }

  async findManyByQuestionId(quastionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === quastionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
