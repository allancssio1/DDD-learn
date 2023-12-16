import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface QuesitonAttachmentProps {
  quesitonId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuesitonAttachment extends Entity<QuesitonAttachmentProps> {
  public get quesitonId() {
    return this.props.quesitonId
  }

  public get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuesitonAttachmentProps, id?: UniqueEntityId) {
    return new QuesitonAttachment(props, id)
  }
}
