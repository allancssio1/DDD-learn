import { AnswerQuestionUseCase } from './answerQuestion'
import { AnswerRepository } from '../repositorues/answerRepository'
import { Answer } from '../entities/Answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (anser: Answer) => {
    return
  },
}

test('should be create a new asnwer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '2',
    content: 'nova resposta',
  })
  expect(answer.content).toEqual('nova resposta')
})
