import { AnswerCommentsRepository } from '@/domain/forum/apllication/repositories/anserCommentsRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'

export class InMemoryAnswerCommentsReposiroty
  implements AnswerCommentsRepository
{
  items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
    const answerComment = await this.items.find(
      (item) => item.id.toString() === answerCommentId,
    )
    return answerComment ?? null
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }
}
