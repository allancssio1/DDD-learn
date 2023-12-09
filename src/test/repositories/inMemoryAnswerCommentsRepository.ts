import { AnswerCommentsRepository } from '@/domain/forum/apllication/repositories/anserCommentsRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'

export class InMemoryAnswerCommentsReposiroty
  implements AnswerCommentsRepository
{
  items: AnswerComment[] = []
  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
