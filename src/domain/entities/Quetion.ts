import { randomUUID } from 'node:crypto'
import { Slug } from './valueObjects/slug'

interface QuestionProsp {
  title: string
  slug: Slug
  content: string
  authorId: string
}

export class Quetion {
  public id: string
  public title: string
  public content: string
  public slug: Slug
  public authorId: string

  constructor(props: QuestionProsp, id?: string) {
    this.content = props.content
    this.title = props.title
    this.slug = props.slug
    this.authorId = props.authorId
    this.id = id ?? randomUUID()
  }
}
