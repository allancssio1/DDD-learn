import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface AnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  public get answerId() {
    return this.props.answerId
  }

  public get attachmentId() {
    return this.props.attachmentId
  }

  async create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    return new AnswerAttachment(props, id)
  }
}
