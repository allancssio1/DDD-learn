import { QuestionsRepository } from '../repositories/questionsRepository'
import { AnswerQuestionUseCase } from './answerQuestion'
import { Question } from '../../enterprise/entities/Question'
import { CreateQuestionUseCase } from './createQuestion'

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('should be create a new asnwer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)
  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova Question',
    content: 'nova resposta',
  })
  expect(question.content).toEqual('nova resposta')
})
