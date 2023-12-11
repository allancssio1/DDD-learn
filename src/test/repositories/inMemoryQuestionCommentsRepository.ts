import { QuestionCommentsRepository } from '@/domain/forum/apllication/repositories/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'

export class InMemoryQuestionCommentsReposiroty
  implements QuestionCommentsRepository
{
  items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    const questionComment = await this.items.find(
      (item) => item.id.toString() === questionCommentId,
    )
    return questionComment ?? null
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = await this.items.findIndex(
      (item) => item.id.toString() === questionComment.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }
}
