export type THistory = {
    numA: number
    numB: number
    operation: string
    result: number
}

export type StackParamsList = {
    Calculator: undefined
    History: THistory[]
}

