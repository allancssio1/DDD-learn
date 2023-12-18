import { WatchedList } from '@/core/entities/watchedList'
import { QuesitonAttachment } from './questionAttachment'

export class QuestionAttachmentList extends WatchedList<QuesitonAttachment> {
  compareItems(a: QuesitonAttachment, b: QuesitonAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
