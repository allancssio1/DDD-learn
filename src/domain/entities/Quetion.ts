import { Slug } from './valueObjects/slug'
import { Entity } from '../../core/entities/entity'

interface QuestionProps {
  title: string
  slug: Slug
  content: string
  authorId: string
}

export class Quetion extends Entity<QuestionProps> {}
