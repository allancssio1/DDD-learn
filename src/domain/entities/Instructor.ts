import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/uniqueEntityId'

interface InstructorProsp {
  name: string
}

export class Instructor extends Entity<InstructorProsp> {
  get name() {
    return this.props.name
  }

  static create(props: InstructorProsp, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id)
    return instructor
  }
}
