import { observable } from '@legendapp/state'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

const calculatorState = observable({
  display: '0',
  previousValue: null as number | null,
  operation: null as string | null,
  waitingForOperand: false,
})

const inputDigit = (digit: number) => {
  const { display, waitingForOperand } = calculatorState.get()
  if (waitingForOperand) {
    calculatorState.display.set(String(digit))
    calculatorState.waitingForOperand.set(false)
  } else {
    calculatorState.display.set(display === '0' ? String(digit) : display + digit)
  }
}

const inputDot = () => {
  const { display, waitingForOperand } = calculatorState.get()
  if (waitingForOperand) {
    calculatorState.display.set('0.')
    calculatorState.waitingForOperand.set(false)
  } else if (display.indexOf('.') === -1) {
    calculatorState.display.set(display + '.')
  }
}

const clear = () => {
  calculatorState.display.set('0')
  calculatorState.previousValue.set(null)
  calculatorState.operation.set(null)
  calculatorState.waitingForOperand.set(false)
}

const performOperation = (nextOperation: string) => {
  const { display, previousValue, operation } = calculatorState.get()
  const inputValue = parseFloat(display)

  if (previousValue === null) {
    calculatorState.previousValue.set(inputValue)
    calculatorState.operation.set(nextOperation)
    calculatorState.waitingForOperand.set(true)
  } else if (operation) {
    const currentValue = previousValue || 0
    const newValue = calculate(currentValue, inputValue, operation)

    calculatorState.display.set(String(newValue))
    calculatorState.previousValue.set(newValue)
    calculatorState.operation.set(nextOperation)
    calculatorState.waitingForOperand.set(true)
  }
}

const calculate = (firstValue: number, secondValue: number, operation: string) => {
  switch (operation) {
    case '+':
      return firstValue + secondValue
    case '-':
      return firstValue - secondValue
    case '*':
      return firstValue * secondValue
    case '/':
      return firstValue / secondValue
    case '=':
      return secondValue
    default:
      return secondValue
  }
}

const CalculatorButton = ({ children, onPress, wide = false }: { children: string; onPress: () => void; wide?: boolean }) => (
  <Button
    flex={wide ? 2 : 1}
    height="$12"
    borderRadius="$6"
    backgroundColor="rgba(255,255,255,0.1)"
    borderWidth={1}
    borderColor="rgba(255,255,255,0.2)"
    pressStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
    onPress={onPress}
  >
    <Text fontSize="$8" color="white" fontWeight="bold">
      {children}
    </Text>
  </Button>
)

export default function TabOneScreen() {
  const display = calculatorState.display.get()

  return (
    <YStack flex={1} backgroundColor="#667eea" paddingHorizontal="$4" paddingVertical="$8">
      <Card
        flex={1}
        borderRadius="$8"
        backgroundColor="rgba(255,255,255,0.1)"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.2)"
        padding="$4"
        justifyContent="space-between"
      >
        <YStack flex={1} justifyContent="center">
          <Text fontSize="$16" color="white" textAlign="right" fontWeight="bold">
            {display}
          </Text>
        </YStack>

        <YStack gap="$2">
          <XStack gap="$2">
            <CalculatorButton onPress={clear}>C</CalculatorButton>
            <CalculatorButton onPress={() => performOperation('/')}>÷</CalculatorButton>
            <CalculatorButton onPress={() => performOperation('*')}>×</CalculatorButton>
            <CalculatorButton onPress={() => performOperation('-')}>-</CalculatorButton>
          </XStack>
          <XStack gap="$2">
            <CalculatorButton onPress={() => inputDigit(7)}>7</CalculatorButton>
            <CalculatorButton onPress={() => inputDigit(8)}>8</CalculatorButton>
            <CalculatorButton onPress={() => inputDigit(9)}>9</CalculatorButton>
            <CalculatorButton onPress={() => performOperation('+')} wide>+</CalculatorButton>
          </XStack>
          <XStack gap="$2">
            <CalculatorButton onPress={() => inputDigit(4)}>4</CalculatorButton>
            <CalculatorButton onPress={() => inputDigit(5)}>5</CalculatorButton>
            <CalculatorButton onPress={() => inputDigit(6)}>6</CalculatorButton>
            <CalculatorButton onPress={() => performOperation('=')} wide>=</CalculatorButton>
          </XStack>
          <XStack gap="$2">
            <YStack gap="$2" flex={3}>
              <XStack gap="$2">
                <CalculatorButton onPress={() => inputDigit(1)}>1</CalculatorButton>
                <CalculatorButton onPress={() => inputDigit(2)}>2</CalculatorButton>
                <CalculatorButton onPress={() => inputDigit(3)}>3</CalculatorButton>
              </XStack>
              <XStack gap="$2">
                <CalculatorButton onPress={() => inputDigit(0)} wide>0</CalculatorButton>
                <CalculatorButton onPress={inputDot}>.</CalculatorButton>
              </XStack>
            </YStack>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}
