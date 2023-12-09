import { QuestionCommentsRepository } from '@/domain/forum/apllication/repositories/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'

export class InMemoryQuestionCommentsReposiroty
  implements QuestionCommentsRepository
{
  items: QuestionComment[] = []
  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
