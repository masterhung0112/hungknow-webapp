import { ActionResult } from 'hkclient-ts/lib/types/actions'

export type SuccessResult = { data: any }

export type ErrorResult = { error: any }

export function isSuccess(result: ActionResult): result is SuccessResult {
  return 'data' in result && !isError(result)
}

export function isError(result: ActionResult): result is ErrorResult {
  return Boolean((result as ErrorResult).error)
}
