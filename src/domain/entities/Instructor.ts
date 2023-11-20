import { Entity } from '../../core/entities/entity'

interface InstructorProsp {
  name: string
}

export class Instructor extends Entity<InstructorProsp> {}
