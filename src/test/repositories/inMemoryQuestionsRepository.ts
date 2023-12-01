import { AnswerRepository } from '@/domain/forum/apllication/repositories/answerRepository'
import { Answer } from '@/domain/forum/enterprise/entities/Answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}
