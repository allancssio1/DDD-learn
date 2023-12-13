import { Either, left, rigth } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (!shouldSuccess) return left('error')

  return rigth('success')
}

test('success result', async () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', async () => {
  const result = doSomething(false)

  expect(result.isRight()).toBe(false)
  expect(result.isLeft()).toBe(true)
})
